import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Spot } from "../spots/spot.entity";

export enum GhestCheckStatus {
    OPENED = 'OPENED',
    CLOSED = 'CLOSED',
    CANCELED = 'CANCELED'
}

@Entity('ghest-checks')
export class GhestCheck {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Column({
        type: 'enum',
        name: 'ghest_id',
        default: GhestCheckStatus.OPENED
    })
    status: string;

    @ManyToOne(() => Spot, { nullable: false })
    @JoinColumn({ name: 'spot_id' })
    spot: Spot;
}