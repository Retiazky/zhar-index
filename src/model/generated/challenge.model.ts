import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, BigIntColumn as BigIntColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, ManyToOne as ManyToOne_, OneToMany as OneToMany_} from "@subsquid/typeorm-store"
import {Ember} from "./ember.model"
import {Deposit} from "./deposit.model"
import {ChallengeStatus} from "./_challengeStatus"

@Entity_()
export class Challenge {
    constructor(props?: Partial<Challenge>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @BigIntColumn_({nullable: false})
    amount!: bigint

    @Index_()
    @BigIntColumn_({nullable: true})
    blockNumber!: bigint | undefined | null

    @Index_()
    @DateTimeColumn_({nullable: false})
    createdAt!: Date

    @Index_()
    @StringColumn_({nullable: false})
    contract!: string

    @Index_()
    @DateTimeColumn_({nullable: false})
    updatedAt!: Date

    @Index_()
    @ManyToOne_(() => Ember, {nullable: true})
    igniter!: Ember

    /**
     * Creator
     */
    @Index_()
    @ManyToOne_(() => Ember, {nullable: true})
    zharrior!: Ember

    @BigIntColumn_({nullable: false})
    depositCount!: bigint

    @BigIntColumn_({nullable: false})
    volume!: bigint

    @OneToMany_(() => Deposit, e => e.challenge)
    deposits!: Deposit[]

    @Column_("varchar", {length: 14, nullable: false})
    status!: ChallengeStatus

    @Index_()
    @DateTimeColumn_({nullable: false})
    expiration!: Date

    @BigIntColumn_({nullable: false})
    disputePeriod!: bigint

    @StringColumn_({nullable: true})
    description!: string | undefined | null

    @BigIntColumn_({nullable: false})
    reward!: bigint

    @StringColumn_({nullable: true})
    uri!: string | undefined | null
}
