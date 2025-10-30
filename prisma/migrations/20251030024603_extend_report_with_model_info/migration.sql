-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "model_a_name" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "model_a_response" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "model_b_name" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "model_b_response" TEXT NOT NULL DEFAULT '';
