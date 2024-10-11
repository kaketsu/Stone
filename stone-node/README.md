# nestjs



# GraphQL

Nest 提供了两种构建 GraphQL 应用的方式，即代码优先和模式优先。你需要选择一种最适合你的方式来进行开发。GraphQL 这一章中的大部分章节都将被分为两个主要部分：如果你采用代码优先，则要遵循其中一个，如果你采用模式优先，则应遵循另外一个。

在代码优先方式中，你将使用装饰器和 TypeScript 类来生成相应的 GraphQL schema。如果你更喜欢用TypeScript并想避免在不同语言语法之间的上下文切换，那么这种方式会更有效。

在模式优先方式中，真相来源就是 GraphQL SDL（Schema Definition Language）文件。SDL是一种在不同平台间共享模式文件的与语言无关的方式。Nest 会基于 GraphQL schemas自动生成 TypeScript 定义（不管是用类或者接口），这样就能减少冗余模版代码的编写


# postgresql
https://www.postgresql.org/download/


# pgadmin 可视化
https://www.pgadmin.org/download/


# mysql
https://dev.mysql.com/downloads/mysql/



$ nest g mo modules/user
$ nest g co modules/user
$ nest g s modules/user