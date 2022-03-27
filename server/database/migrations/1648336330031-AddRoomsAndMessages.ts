import {MigrationInterface, QueryRunner, QueryRunnerAlreadyReleasedError, Table, TableForeignKey} from "typeorm";

export class AddRoomsAndMessages1648336330031 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
        new Table({
            name: 'chat_room',
            columns: [
                {
                    name:'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: 'name',
                    type: 'text',
                  },
                  {
                    name: 'roomkey',
                    type: 'text',
                    isUnique: true,
                  },
                  {
                      name: 'latitude',
                      type: 'double precision',
                  },
                  {
                      name: 'longitutde',
                      type: 'double precision',
                  },
            ],
        }),
    );
        await queryRunner.createTable(
            new Table({
              name: 'message',
              columns: [
                {
                  name: 'id',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true,
                },
                {
                  name: 'chatRoomId',
                  type: 'int',
                },
                {
                  name: 'userId',
                  type: 'int',
                },
                {
                  name: 'contents',
                  type: 'text',
                },
                {
                  name: 'userName',
                  type: 'text',
                },
              ],
            }),
        );

        await queryRunner.createForeignKey(
            'message',
            new TableForeignKey({
              columnNames: ['chatRoomId'],
              referencedColumnNames: ['id'],
              referencedTableName: 'chat_room',
              onDelete: 'CASCADE',
            }),
          );
    }

    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('message');
        await queryRunner.dropTable('chat_room');
    }

}
