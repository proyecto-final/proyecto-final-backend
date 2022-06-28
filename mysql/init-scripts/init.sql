create table test_table
(
    id int auto_increment,
    constraint test_table_pk
        primary key (id)
);

create unique index test_table_id_uindex
    on test_table (id);

