-- CreateTable
CREATE TABLE "glossary" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "glossary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "glossary_project_id_idx" ON "glossary"("project_id");

-- CreateIndex
CREATE INDEX "glossary_term_idx" ON "glossary"("term");

-- AddForeignKey
ALTER TABLE "glossary" ADD CONSTRAINT "glossary_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
