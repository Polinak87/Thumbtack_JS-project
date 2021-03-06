# thumbtak-sunday-school

## Requirements:
1. Node v10.x
2. NPM v5.x

## How to install requirements:
1. npm install
2. cd ./frontend && npm install

## How to run app:
1. npm start

## Repo contains:
1. docker-compose file with postgres db. You can change db_user and db_password in docker-compose.yml file.

## How to use Docker:
* npm run docker-build: to download images if it's still not exist
* npm run docker-start: start postgres within docker containers
* npm run docker-clean: turn containers off.

## Task

Приложение для обмена предметами.

1. Описание задачи:
* Необходимо разработать приложение, которое позволяет пользователям осуществлять обмен предметами.
* Каждый пользователь может добавлять предметы в свой инвентарь. Каждый предмет относится к определенной категории. После добавления предмет может быть выставлен пользователем на обмен.
* Пользователь может просматривать ленту предметов, выставленных на обмен другими пользователями, а также отправлять запросы на обмен предмета из своего инвентаря на предмет другого пользователя.
* Обмен считается завершенным после подтверждения заявки на обмен пользователем, получившим эту заявку. После завершения обмена, в инвентаре пользователя появляется новый предмет (выставленный на обмен предмет переходит к другому пользователю, участвовавшему в обмене)

2. Функционал должен включать в себя:
  * Регистрацию/авторизацию
  * Добавление предметов в инвентарь
  * Выставление предметов на обмен
  * Просмотр предметов, выставленных на обмен другими пользователями
  * Создание заявки на обмен
  * Просмотр списка входящих и исходящих заявок на обмен
  * Подтверждение заявки на обмен

3. Требования:
    * Регистрация и авторизация:
        1. Приложение должно иметь формы для регистрации и авторизации
        2. Информация обязательная при регистрации: имя, фамилия, электронный адрес (уникальный), пароль
        3. Для авторизации пользователь должен указать электронный адрес и пароль
        4. создание таблицы пользователей в базе.
    * Добавление предметов в инвентарь:
        1. Приложение должно иметь форму добавления предмет в инвентарь пользователя.
        2. При добавление предмета в инвентарь пользователь может воспользоваться одним из возможных вариантов: выбрать уже существующий в системе предмет либо создать новый
        3. Список существующих в системе предметов формируется на основе предметов, загруженных пользователями ранее
        4. При создании нового предмета пользователь должен указать следующую информацию: название предмета, описание, категория, изображение. Все поля являются обязательными. 
        5. Категория предмета должны быть выбрана из списка доступных категорий. Список доступных категорий не может быть изменен пользователями. Необходимо подготовить скрипт для заполнения списка категорий в базе данных.
    * Выставление предметов на обмен:
        1. После добавление предмета в инвентарь, пользователь может выставить его на обмен. Пользователь в любой момент может снять выставленный ранее предмет с обмена
    * Просмотр предметов, выставленных на обмен другими пользователями:
        1. После выставления на обмен, предмет становится доступен для просмотра другим пользователям системы. Каждый пользователь может просматривать ленту, в которой отображаются предметы выставленные на обмен другими пользователями.
        2. Предметы в списке могут быть отфильтрованы по категории
        3. Предметы в списке могут быть отсортированы по дате добавления
        4. Дополнительно пользователь может просматривать список предметов выставленных на обмен конкретным пользователем
    * Создание заявки на обмен:
        1. При создании заявки на обмен пользователь должен выбрать предмет из своего инвентаря, который он готов предложить в обмен на предмет, выставленный другим пользователем.
    * Просмотр списка входящих и исходящих заявок на обмен:
        1. Пользователь может просматривать список входящих и исходящих заявок на обмен. 
        2. Заявка может иметь один из перечисленных статусов:
            * После создания заявка имеет статус Pending (в ожидании)
            * В случае, если заявка была отменена пользователем, создавшим заявку, она имеет статус Canceled (отменена)
            * В случае, если пользователь отклонил входящую заявку, она переходит в статус Rejected (отклонена)
            * В случае, если обмен состоялся, заявка имеет статус Completed (завершена)
        3. Заявки в списках могут быть отфильтрованы по статусу
    * Подтверждение заявки на обмен:
        1. пользователь может отклонять или подтверждать входящие заявки, а также отменять исходящие.


4. Данные:
    * mysql в качестве СУБД

5. Backend:
    * Технологии:
        1. NodeJS v. 10
        2. ES6+ JavaScript
        3. Sequelize: http://docs.sequelizejs.com/ 
        4. Koa2: https://github.com/koajs/koa 
        5. REST API (HTTP)
        6. Passport: http://www.passportjs.org/ 
    * Общие требования:
        1. Наличие конфигурационных файлов для разных окружений (как минимум development и test)
        2. Наличие логирования
        3. Codestyle-checker
        4. Покрытие основных сценариев тестами
        5. В качестве хранилища пользовательских сессий необходимо использовать таблицу БД

6. Frontend:
    * Реализовать без использования библиотек компонентов React


