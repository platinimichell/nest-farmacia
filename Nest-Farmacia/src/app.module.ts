import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './categoria/entities/categoria.entity';
import { CategoriaModule } from './categoria/modules/categoria.module';
import { Produto } from './produto/entities/produto.entity';
import { ProdutoModule } from './produto/modules/produto.module';

//conectando o banco de dados
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_farmacia',
      entities: [Categoria, Produto],
      synchronize: true
    }),
    CategoriaModule,
    ProdutoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}