-- CreateEnum
CREATE TYPE "ModelSide" AS ENUM ('MODEL_A', 'MODEL_B', 'UNKNOWN');

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,
    "turn_id" TEXT NOT NULL,
    "model" "ModelSide" NOT NULL,
    "reason" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_turn_id_fkey" FOREIGN KEY ("turn_id") REFERENCES "Turn"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
