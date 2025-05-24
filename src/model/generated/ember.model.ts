import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, ManyToOne as ManyToOne_, Index as Index_, DateTimeColumn as DateTimeColumn_, BigIntColumn as BigIntColumn_, OneToMany as OneToMany_} from "@subsquid/typeorm-store"
import {Metadata} from "./metadata.model"
import {Challenge} from "./challenge.model"
import {Deposit} from "./deposit.model"
import {Token} from "./token.model"

/**
 * Basically a user.
 */
@Entity_()
export class Ember {
    constructor(props?: Partial<Ember>) {
        Object.assign(this, props)
    }

    /**
     * Address
     */
    @PrimaryColumn_()
    id!: string

    @StringColumn_({nullable: true})
    name!: string | undefined | null

    @Index_()
    @ManyToOne_(() => Metadata, {nullable: true})
    metadata!: Metadata | undefined | null

    @Index_()
    @DateTimeColumn_({nullable: false})
    createdAt!: Date

    @DateTimeColumn_({nullable: false})
    updatedAt!: Date

    @Index_()
    @BigIntColumn_({nullable: true})
    blockNumber!: bigint | undefined | null

    @Index_()
    @BigIntColumn_({nullable: false})
    totalXp!: bigint

    @OneToMany_(() => Challenge, e => e.igniter)
    ignited!: Challenge[]

    @OneToMany_(() => Challenge, e => e.zharrior)
    assigned!: Challenge[]

    @OneToMany_(() => Deposit, e => e.stoker)
    stoked!: Deposit[]

    @OneToMany_(() => Token, e => e.ember)
    tokens!: Token[]
}
