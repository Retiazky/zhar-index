import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class Metadata {
    constructor(props?: Partial<Metadata>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @StringColumn_({nullable: true})
    name!: string | undefined | null

    @StringColumn_({nullable: true})
    description!: string | undefined | null

    @StringColumn_({nullable: true})
    image!: string | undefined | null

    @StringColumn_({nullable: true})
    animationUrl!: string | undefined | null

    @StringColumn_({nullable: true})
    type!: string | undefined | null

    @StringColumn_({nullable: true})
    banner!: string | undefined | null

    @StringColumn_({nullable: true})
    externalUrl!: string | undefined | null
}
