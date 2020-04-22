# Migration `20200410160424-initial-migration`

This migration has been generated at 4/10/2020, 4:04:24 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."User" (
    "email" text  NOT NULL ,
    "id" text  NOT NULL ,
    "password" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200410160424-initial-migration
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,15 @@
+datasource db {
+  provider = "postgresql"
+  url      = env("DATABASE_URL")
+}
+
+generator client {
+  provider      = "prisma-client-js"
+  binaryTargets = ["native", "debian-openssl-1.1.x"]
+}
+
+model User {
+  id       String @default(uuid()) @id
+  email    String @unique
+  password String
+}
```


