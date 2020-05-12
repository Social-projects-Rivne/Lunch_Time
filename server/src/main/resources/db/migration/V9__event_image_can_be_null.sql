alter table event alter column id
	set maxvalue 2147483647;

alter table event alter column image drop not null;
