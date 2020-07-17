import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
  TableColumn,
} from 'typeorm';

export default class AlterProviderFieldToProviderId1594995362610
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'provider');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    /*
     config CASCADE "Quando um usuário for deletado, o que acontece com os
     campos linkados? Somem junto ou ficam como nulo?"

     -> Se um prestador tem agendamentos e acaba deletando sua conta, os seus
     agendamentos devem ficar com o prestador nulo, e não serem deletados junto.

     -> Se um usuário possui endereços linkados ao seu perfil, e exclui sua conta, 
     não tem sentido manter os dados do endereço.
    */

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentProvider', // Nome para facilitar delete
        columnNames: ['provider_id'], // Qual a coluna que vai receber a chave estrangeira
        referencedColumnNames: ['id'], // Nome da coluna na tabela usuários, que vai representar esse provider_id
        referencedTableName: 'users', // Nome da tabela que vai fazer referência com esse campo
        onDelete: 'SET NULL',
        // onDelete | onUpdate -> RESTRICT, não permite o usuário ser deletado,
        //                     -> SET NULL, preenche provider_id como null,
        //                     -> CASCADE, deleta todos os relacionamentos,
        onUpdate: 'CASCADE', // Ao alterar ID
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Obrigatório desfazer tudo na ordem reversa
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

    await queryRunner.dropColumn('appointments', 'provider_id');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}
