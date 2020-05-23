import React, { useState, useEffect, useContext } from 'react';
import { Submission } from '../../../../util/interfaces';
import { ViewSwitcher } from './ViewSwitcher';
import classNames from 'classnames';
import { SelectedDeleteBanner } from './SelectedDeleteBanner';
import { API_URL, submissionsApi } from '../../../../api/api';
import { useDebounce } from '../../../../util/hooks';
import { FormContext } from '../../../../store/FormContext';
import { FormViewContext } from '../../../../store/FormViewContext';
import { ListView } from './ListView';
import { TableView } from './TableView';
import { Spinner } from '../../../../components/Spinner';
import { SubmissionsNoneFound } from './SubmissionsNoneFound';
import { SearchInput } from './Search/SearchInput';
import { SearchResultsTitle } from './Search/SearchResultsTitle';
import { SearchLoading } from './Search/SearchLoading';
import { SearchNoResults } from './Search/SearchNoResults';
import { SubmissionsPaginator } from './SubmissionsPaginator';
import { SubmissionsGlobalCheckbox } from './SubmissionsGlobalCheckbox';

export const FormSubmissions = () => {
  const { form } = useContext(FormContext);

  const [perPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);

  const [shown, setShown] = useState<Submission[]>([]);
  const [paginatedRetults, setPaginatedResults] = useState<Submission[]>([]);

  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<number[]>([]);

  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

  const [view, setView] = useState<'list' | 'table'>('table');

  useEffect(() => {
    if (searchQuery) {
      setIsSearching(true);
      setSearchLoading(true);
      return setShown([]);
    }

    setIsSearching(false);
    setShown(paginatedRetults);
    setSearchLoading(false);
  }, [searchQuery]);

  const debouncedSearch = useDebounce(searchQuery, 1000);

  useEffect(() => {
    async function search() {
      if (searchQuery) {
        const res = await submissionsApi.search({ formId: form.id, query: searchQuery });
        if ('error' in res) return;

        setShown(res.data);
        setSearchLoading(false);
      }
    }

    search();
  }, [debouncedSearch]);

  async function fetchSubmissions(page: number = 0) {
    setLoading(true);
    const res = await submissionsApi.get({ perPage, page, formId: form.id });
    if ('error' in res) return;

    setShown(res.data.submissions);
    setPaginatedResults(res.data.submissions);
    setTotal(res.data.total);

    setPage(page);
    setLoading(false);
  }

  async function deleteSubmissions() {
    const res = await submissionsApi.deleteMultiple({ formId: form.id, submissions: selected });
    if ('error' in res) return;

    setShown(shown.filter(s => !selected.includes(s.id)));
    setTotal(total - selected.length);
    setSelected([]);

    const maxPage = Math.ceil((total - selected.length) / perPage) - 1;

    if (isSearching && selected.length == shown.length) {
      setPaginatedResults(paginatedRetults.filter(s => !selected.includes(s.id)));
      setSearchQuery('');
    }

    if (page > maxPage) {
      if (page == 0) {
        setTotal(0);
        return setLoading(false);
      }

      setPage(maxPage);
      fetchSubmissions(maxPage);
    }
  }

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return (
    <div className="-mt-4 sm:mt-0">
      <SelectedDeleteBanner
        numSelected={selected.length}
        onClick={() => {
          deleteSubmissions();
        }}
        show={selected.length !== 0}
      />

      {loading && <Spinner />}

      {!loading && total == 0 && !isSearching && <SubmissionsNoneFound />}

      {total !== 0 && (
        <div>
          <div className="mb-3 sm:mb-0">
            <div className="flex rounded-md">
              <SubmissionsGlobalCheckbox
                onChange={e => {
                  if (e.target.checked) {
                    return setSelected(shown.map(s => s.id));
                  }

                  setSelected([]);
                }}
              />

              <div className="relative flex flex-grow rounded-md shadow-sm focus-within:z-10">
                <SearchInput value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />

                <ViewSwitcher view={view} setView={setView} />
              </div>
            </div>
          </div>
          <ul>
            {!loading && searchLoading && <SearchLoading />}
            {isSearching && !searchLoading && shown.length !== 0 && <SearchResultsTitle search={searchQuery} onReset={() => setSearchQuery('')} />}
            {isSearching && !searchLoading && shown.length == 0 && <SearchNoResults query={searchQuery} />}

            {!isSearching && (
              <FormViewContext.Provider value={{ selected, setSelected, submissions: shown }}>
                {view == 'list' && <ListView />}
                {view == 'table' && <TableView />}
              </FormViewContext.Provider>
            )}
          </ul>
          {!isSearching && (
            <SubmissionsPaginator
              page={page}
              total={total}
              perPage={perPage}
              onNext={() => fetchSubmissions(page + 1)}
              onPrevious={() => fetchSubmissions(page - 1)}
            />
          )}
        </div>
      )}
    </div>
  );
};
