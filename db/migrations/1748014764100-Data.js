module.exports = class Data1748014764100 {
    name = 'Data1748014764100'

    async up(db) {
        await db.query(`ALTER TABLE "challenge" ADD "expiration" TIMESTAMP WITH TIME ZONE NOT NULL`)
        await db.query(`ALTER TABLE "challenge" ADD "dispute_period" numeric NOT NULL`)
        await db.query(`ALTER TABLE "challenge" ADD "description" text`)
        await db.query(`ALTER TABLE "challenge" ADD "reward" numeric NOT NULL`)
        await db.query(`CREATE INDEX "IDX_efc4a1df7ddb5a325572e4d4ab" ON "challenge" ("expiration") `)
    }

    async down(db) {
        await db.query(`ALTER TABLE "challenge" DROP COLUMN "expiration"`)
        await db.query(`ALTER TABLE "challenge" DROP COLUMN "dispute_period"`)
        await db.query(`ALTER TABLE "challenge" DROP COLUMN "description"`)
        await db.query(`ALTER TABLE "challenge" DROP COLUMN "reward"`)
        await db.query(`DROP INDEX "public"."IDX_efc4a1df7ddb5a325572e4d4ab"`)
    }
}
