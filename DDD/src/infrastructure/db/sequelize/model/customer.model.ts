import { AllowNull, Column, Model, PrimaryKey, Table } from "sequelize-typescript";




@Table({
    tableName:'costumers',
   timestamps:false,
})
export default class customerModel extends Model{
    @PrimaryKey
    @Column
    declare id:string;

    @Column({allowNull:false})
    declare name:string;
    @Column({allowNull:false})
    declare rua:string;
    @Column({allowNull:false})
    declare numero:number;
    @Column({allowNull:false})
    declare zip:string;
    @Column({allowNull:false})
    declare cidade:string;
    @Column({allowNull:false})
    declare active:boolean;
    @Column({allowNull:false})
    declare rewardPoints:number

    

}


