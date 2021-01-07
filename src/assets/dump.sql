CREATE TABLE IF NOT EXISTS fwp_category(
    fwp_cat_code INTEGER PRIMARY KEY AUTOINCREMENT,
    fwp_cat_name TEXT
);

CREATE TABLE IF NOT EXISTS fwp_unit(
    fwp_unit_code INTEGER PRIMARY KEY AUTOINCREMENT,
    fwp_unit_name TEXT
);

CREATE TABLE IF NOT EXISTS fwp_product(
    fwp_pro_code INTEGER PRIMARY KEY AUTOINCREMENT,
    fwp_pro_name TEXT,
    fwp_pro_subproduct TEXT,
    fwp_pro_unitcode INTEGER,
    fwp_pro_catcode INTEGER,
    fwp_pro_tagtype TEXT,
    FOREIGN KEY (fwp_pro_unitcode)
	REFERENCES fwp_unit (fwp_unit_code),
	FOREIGN KEY (fwp_pro_catcode)
	REFERENCES fwp_category (fwp_cat_code)
);

CREATE TABLE IF NOT EXISTS fwp_subproduct(
    fwp_sub_code INTEGER PRIMARY KEY AUTOINCREMENT,
    fwp_sub_name TEXT,
    fwp_sub_procode INTEGER,
    FOREIGN KEY (fwp_sub_procode)
	REFERENCES fwp_product (fwp_pro_code)
);

CREATE TABLE IF NOT EXISTS fwp_tax(
    fwp_tax_code INTEGER PRIMARY KEY AUTOINCREMENT,
    fwp_tax_name TEXT,
    fwp_tax_per INTEGER,
    fwp_tax_type TEXT
);

CREATE TABLE IF NOT EXISTS fwp_hsn(
    fwp_hsn_code TEXT PRIMARY KEY,
    fwp_hsn_name TEXT
);

CREATE TABLE IF NOT EXISTS fwp_hsn_tax(
    fwp_hsn_tax_code INTEGER PRIMARY KEY AUTOINCREMENT,
    fwp_hsn_tax_hsncode TEXT,
    fwp_hsn_tax_salesamount INTEGER,
    fwp_hsn_tax_belowsgstcode INTEGER,
    fwp_hsn_tax_belowcgstcode INTEGER,
    fwp_hsn_tax_belowigstcode INTEGER,
    fwp_hsn_tax_belowsrvcode INTEGER,
    fwp_hsn_tax_abovesgstcode INTEGER,
    fwp_hsn_tax_abovecgstcode INTEGER,
    fwp_hsn_tax_aboveigstcode INTEGER,
    fwp_hsn_tax_abovesrvcode INTEGER,
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

CREATE TABLE IF NOT EXISTS fwp_hsn_product(
    fwp_hsn_pro_code INTEGER PRIMARY KEY AUTOINCREMENT,
    fwp_hsn_pro_hsncode TEXT,
    FOREIGN KEY (fwp_hsn_pro_code)
	REFERENCES fwp_product (fwp_pro_code),
	FOREIGN KEY (fwp_hsn_pro_hsncode)
	REFERENCES fwp_hsn (fwp_hsn_code)
);

CREATE TABLE IF NOT EXISTS fwp_rate(
    fwp_rat_code INTEGER PRIMARY KEY AUTOINCREMENT,
    fwp_rat_procode INTEGER,
    fwp_rat_subcode INTEGER,
    fwp_rat_brncode INTEGER,
    fwp_rat_mrprate INTEGER,
    fwp_rat_selllingrate INTEGER,
    FOREIGN KEY (fwp_rat_procode)
	REFERENCES fwp_product (fwp_pro_code)
);

CREATE TABLE IF NOT EXISTS fwp_paymentmode(
    fwp_pay_name TEXT PRIMARY KEY,
    fwp_pay_code TEXT,
    fwp_pay_disporder INTEGER
);

CREATE TABLE IF NOT EXISTS fwp_state(
    fwp_sta_code INTEGER PRIMARY KEY,
    fwp_sta_name TEXT
);


CREATE TABLE IF NOT EXISTS fwp_customer(
    fwp_cus_code INTEGER PRIMARY KEY,
    fwp_cus_name TEXT,
    fwp_cus_dtofbirth TEXT,
    fwp_cus_address TEXT,
    fwp_cus_area TEXT,
    fwp_cus_city TEXT,
    fwp_cus_pincode TEXT,
    fwp_cus_mobileno TEXT,
    fwp_cus_mailid TEXT,
    fwp_cus_paymenttype INTEGER,
    fwp_cus_day INTEGER
);

CREATE TABLE IF NOT EXISTS fwp_controldetails(
    fwp_con_code TEXT,
	fwp_con_name TEXT,
	fwp_con_type TEXT,
	fwp_con_long INTEGER,
	fwp_con_double INTEGER,
	fwp_con_text TEXT,
	fwp_con_length INTEGER,
	fwp_con_date TEXT			
);

CREATE TABLE IF NOT EXISTS fwp_fn_day(
    fwp_cat_code INTEGER PRIMARY KEY AUTOINCREMENT,
    fwp_cat_name TEXT
);

CREATE TABLE IF NOT EXISTS fwp_category(
    Name TEXT,
    value INTEGER
);

CREATE TABLE IF NOT EXISTS fwp_fn_paymenttype(
   Name TEXT,
    value INTEGER
);


