create table  fwp_category
(
	fwp_cat_code			bigint			not null primary key,
	fwp_cat_name			nvarchar(40)	not null
)

-- INSERT INTO fwp_category (fwp_cat_code, fwp_cat_name) VALUES (2, 'test2');

-- go

create table fwp_unit
(
	fwp_unit_code			bigint			not null primary key,
	fwp_unit_name			nvarchar(40)	not null
)
-- INSERT INTO fwp_unit (fwp_unit_code, fwp_unit_name) VALUES (1, 'testUnitName');
-- go 

create table fwp_product
(
	fwp_pro_code				bigint				not null primary key,
	fwp_pro_name				nvarchar(40)		not null,
	fwp_pro_subproduct			nvarchar(1)			not null,
	fwp_pro_unitcode			bigint				not null,
	fwp_pro_catcode				bigint				not null,
	fwp_pro_tagtype				nvarchar(1)			not null,
	FOREIGN KEY (fwp_pro_unitcode)
	REFERENCES fwp_unit (fwp_unit_code),
	FOREIGN KEY (fwp_pro_catcode)
	REFERENCES fwp_category (fwp_cat_code)
);

-- INSERT INTO fwp_product (fwp_pro_code,fwp_pro_name,fwp_pro_subproduct,fwp_pro_unitcode,fwp_pro_catcode,fwp_pro_tagtype) VALUES (1, 'testProductName', 'testSubProductName', 1, 1, 'testProtagType');

-- go 

create table fwp_subproduct
(
	fwp_sub_code				bigint				not null primary key,
	fwp_sub_name				nvarchar(40)		not null,
	fwp_sub_procode				bigint				not null,
	FOREIGN KEY (fwp_sub_procode)
	REFERENCES fwp_product (fwp_pro_code)
);

-- INSERT INTO fwp_subproduct(fwp_sub_code, fwp_sub_name, fwp_sub_procode) VALUES (1, 'testSubName', 1);

-- go 

create table fwp_tax
(
	fwp_tax_code				bigint				not null primary key,
	fwp_tax_name				nvarchar(40)		not null,	
	fwp_tax_per					numeric(10, 2)		not null,
	fwp_tax_type				nvarchar(4)			not null		
);

-- INSERT INTO fwp_tax(fwp_tax_code, fwp_tax_name, fwp_tax_per, fwp_tax_type) VALUES (1, 'testTaxName', 10, 'testTaxtype');

-- go

create table fwp_hsn
(
	fwp_hsn_code				nvarchar(20)		not null primary key,
	fwp_hsn_name				nvarchar(40)		not null
);

-- INSERT INTO fwp_hsn(fwp_hsn_code, fwp_hsn_name) VALUES ('testhsnCode', 'testhsnName');

-- go 

create table fwp_hsn_tax
(
	fwp_hsn_tax_code				INTEGER				not null primary key identity, /*autoincrement*/
	fwp_hsn_tax_hsncode				nvarchar(20)		not null,
	fwp_hsn_tax_salesamount			numeric(18, 2)		null,
	fwp_hsn_tax_belowsgstcode		bigint				not null,
	fwp_hsn_tax_belowcgstcode		bigint				not null,		
	fwp_hsn_tax_belowigstcode		bigint				not null,	
	fwp_hsn_tax_belowsrvcode		bigint				not null,	
	fwp_hsn_tax_abovesgstcode		bigint				not null,
	fwp_hsn_tax_abovecgstcode		bigint				not null,		
	fwp_hsn_tax_aboveigstcode		bigint				not null,		
	fwp_hsn_tax_abovesrvcode		bigint				not null,
	FOREIGN KEY (fwp_hsn_tax_hsncode)
	REFERENCES fwp_hsn (fwp_hsn_code),
	FOREIGN KEY (fwp_hsn_tax_belowsgstcode)
	REFERENCES fwp_tax (fwp_tax_code),
	FOREIGN KEY (fwp_hsn_tax_belowcgstcode)
	REFERENCES fwp_tax (fwp_tax_code),
	FOREIGN KEY (fwp_hsn_tax_belowigstcode)
	REFERENCES fwp_tax (fwp_tax_code),
	FOREIGN KEY (fwp_hsn_tax_belowsrvcode)
	REFERENCES fwp_tax (fwp_tax_code),
	FOREIGN KEY (fwp_hsn_tax_abovesgstcode)
	REFERENCES fwp_tax (fwp_tax_code),
	FOREIGN KEY (fwp_hsn_tax_abovecgstcode)
	REFERENCES fwp_tax (fwp_tax_code),
	FOREIGN KEY (fwp_hsn_tax_aboveigstcode)
	REFERENCES fwp_tax (fwp_tax_code),
	FOREIGN KEY (fwp_hsn_tax_abovesrvcode)
	REFERENCES fwp_tax (fwp_tax_code)
);
-- INSERT INTO fwp_hsn_tax(fwp_hsn_tax_code, fwp_hsn_tax_hsncode, fwp_hsn_tax_salesamount, fwp_hsn_tax_belowsgstcode, fwp_hsn_tax_belowcgstcode, fwp_hsn_tax_belowigstcode, fwp_hsn_tax_belowsrvcode, fwp_hsn_tax_abovesgstcode, fwp_hsn_tax_abovecgstcode, fwp_hsn_tax_aboveigstcode, fwp_hsn_tax_abovesrvcode) VALUES (1, 'testhsnCode', 1000, 1,1,1,1,1,1,1,1);
-- go

create table fwp_hsn_product
(
	fwp_hsn_pro_code				bigint				not null,	
	fwp_hsn_pro_hsncode				nvarchar(20)		not null,
	FOREIGN KEY (fwp_hsn_pro_code)
	REFERENCES fwp_product (fwp_pro_code),
	FOREIGN KEY (fwp_hsn_pro_hsncode)
	REFERENCES fwp_hsn (fwp_hsn_code)
);

-- INSERT INTO fwp_hsn_product (fwp_hsn_pro_code, fwp_hsn_pro_hsncode) VALUES (1, 'testhsnCode');

-- go

Create table fwp_rate
(
	fwp_rat_code					bigint				not null primary key,
	fwp_rat_procode					bigint				not null,
	fwp_rat_subcode					bigint				not null,
	fwp_rat_brncode					bigint				not null,
	fwp_rat_mrprate					numeric(15, 2)		not null,
	fwp_rat_selllingrate			numeric(15, 2)		not null,
	FOREIGN KEY (fwp_rat_procode)
	REFERENCES fwp_product (fwp_pro_code)
);

-- INSERT INTO fwp_rate(fwp_rat_code, fwp_rat_procode, fwp_rat_subcode, fwp_rat_brncode, fwp_rat_mrprate, fwp_rat_selllingrate) VALUES (1,1,1,1,1,1);

-- go

create table fwp_paymentmode
(
	fwp_pay_name						nvarchar(30)		not null,
	fwp_pay_code						nvarchar(2)			not null primary key,
	fwp_pay_disporder					int					not null
);

-- INSERT INTO fwp_paymentmode(fwp_pay_name, fwp_pay_code, fwp_pay_disporder) VALUES ('testPayName', 'testPayCode', 1);

-- go

create table fwp_state
(
	fwp_sta_code				bigint				not null primary key,
	fwp_sta_name				nvarchar(40)		not null
);

-- INSERT INTO fwp_state(fwp_sta_code, fwp_sta_name) VALUES (1, 'testStaName');

-- go

create table fwp_customer
(
	fwp_cus_code				bigint				not null primary key,
	fwp_cus_name				nvarchar(40)		not null,
	fwp_cus_dtofbirth			date				null,
	fwp_cus_address				nvarchar(50)		not null default '',
	fwp_cus_area				nvarchar(20)		not null default '',
	fwp_cus_city				nvarchar(20)		not null default '',
	fwp_cus_pincode				nvarchar(15)		not null default '',
	fwp_cus_mobileno			nvarchar(15)		not null,
	fwp_cus_mailid				nvarchar(20)		not null,
	fwp_cus_paymenttype			int					not null,
	fwp_cus_day					int					not null
);

-- INSERT INTO fwp_customer(fwp_cus_code, fwp_cus_name, fwp_cus_dtofbirth, fwp_cus_address, fwp_cus_area, fwp_cus_city, fwp_cus_pincode, fwp_cus_mobileno, fwp_cus_mailid, fwp_cus_paymenttype, fwp_cus_day) VALUES (1, 'testCustomerName', '21/12/2020', 'testAddress', 'testArea', 'testCity', 'testpincode', 'testMobileno', 'testMailId', 1, 2);

-- go

create table fwp_controldetails
(
	fwp_con_code					nvarchar(20)		not null,
	fwp_con_name					nvarchar(100)		not null,
	fwp_con_type					nvarchar(1)			not null,
	fwp_con_long					int					not null,
	fwp_con_double					numeric(15,2)		not null,
	fwp_con_text					nvarchar(200)		not null,
	fwp_con_length					int					not null,
	fwp_con_date					date				null								
);

-- INSERT INTO fwp_controldetails(fwp_con_code, fwp_con_name, fwp_con_type, fwp_con_long, fwp_con_double, fwp_con_text, fwp_con_length, fwp_con_date) VALUES ('testConCode', 'testConName', 'testConType', 1, 12, 'testConText', 12, '1121/12/2020');

-- go

create table fwp_fn_day
(
	Name nvarchar(20),
	value int
);

-- INSERT INTO fwp_fn_day(Name, value) VALUES ('testName', 1);
-- go

create table fwp_fn_paymenttype
(
	Name nvarchar(20),
	value int
)

-- INSERT INTO fwp_fn_paymenttype(Name, value) VALUES ('testName', 1);