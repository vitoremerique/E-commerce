import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: 'orders',
    timestamps: false,
})
export default class OrderModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => (require('./Customer.model').default))
    @Column({ allowNull: false })
    declare customer_id: string;

    @BelongsTo(() => (require('./Customer.model').default))
    declare customer: typeof import('./customer.model').default;

    @HasMany(() => (require('./order-item.model').default))
    declare items: typeof import('./order-item.model').default[];

    

    @Column({ allowNull: false })
    declare total: number;
}
