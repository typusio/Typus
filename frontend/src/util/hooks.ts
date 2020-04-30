import { useMemo, MutableRefObject, useEffect, useState } from 'react';
import { useParams, useLocation, useHistory, useRouteMatch } from 'react-router-dom';

import queryString from 'query-string';
import { useFormik, FormikValues } from 'formik';
import { API_URL } from './api';

export function useRouter() {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();

  // Return our custom router object
  // Memoize so that a new object is only returned if something changes
  return useMemo(() => {
    return {
      // For convenience add push(), replace(), pathname at top level
      push: history.push,
      replace: history.replace,
      pathname: location.pathname,
      // Merge params and parsed query string into single "query" object
      // so that they can be used interchangeably.
      // Example: /:topic?sort=popular -> { topic: "react", sort: "popular" }
      query: {
        ...queryString.parse(location.search), // Convert string to object
        ...params,
      },
      // Include match, location, history objects so we have
      // access to extra React Router functionality if needed.
      match,
      location,
      history,
    };
  }, [params, match, location, history]);
}

export const useOutsideClick = (ref: MutableRefObject<any>, callback: () => void) => {
  const handleClick = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

export function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useApiForm(route: string, { ignoredValues, initialValues }: { ignoredValues: string[]; initialValues: { [key: string]: any } }) {
  const [loading, setLoading] = useState(true);

  const formik = useFormik({
    initialValues,
    async onSubmit(values) {
      await fetch(`${API_URL}${route}`, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        method: 'PATCH',
        body: JSON.stringify(values),
      });
    },
  });

  useEffect(() => {
    async function fetchValues() {
      const data = await fetch(`${API_URL}${route}`, { credentials: 'include' }).then(res => res.json());

      for (const value of ignoredValues) {
        delete data[value];
      }

      formik.setValues(data);
      setLoading(false);
    }

    fetchValues();
  }, []);

  return { ...formik, loading };
}
