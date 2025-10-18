-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "year_id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Project_year_id_idx" ON "Project"("year_id");

-- CreateIndex
CREATE INDEX "Project_owner_id_idx" ON "Project"("owner_id");

-- CreateIndex
CREATE INDEX "Project_start_date_end_date_idx" ON "Project"("start_date", "end_date");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
