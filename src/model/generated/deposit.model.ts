import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, BigIntColumn as BigIntColumn_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_} from "@subsquid/typeorm-store"
import {Challenge} from "./challenge.model"
import {Ember} from "./ember.model"

@Entity_()
export class Deposit {
    constructor(props?: Partial<Deposit>) {
        Object.assign(this, props)
    }

    /**
     * tokenId + adress
     */
    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Challenge, {nullable: true})
    challenge!: Challenge

    @Index_()
    @BigIntColumn_({nullable: true})
    blockNumber!: bigint | undefined | null

    @Index_()
    @DateTimeColumn_({nullable: false})
    createdAt!: Date

    @Index_()
    @ManyToOne_(() => Ember, {nullable: true})
    stoker!: Ember

    @StringColumn_({nullable: true})
    txHash!: string | undefined | null

    @BigIntColumn_({nullable: false})
    amount!: bigint
}
