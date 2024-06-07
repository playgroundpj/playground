-- --------------------------------------------------------
-- db 생성 및 유저 권한 할당 : root 계정에서 실행할 것
-- --------------------------------------------------------
-- 계정 생성 후 데이터베이스 활용

# -- 1) 새로운 players 계정 만들기
# CREATE USER 'players'@'%' IDENTIFIED BY  'players'; -- 'localhost' 대신 '%'를 쓰면 외부 ip로 접속 가능하다.
#
# -- 현재 존재하는 데이터베이스 확인
# SHOW databases;
#
# -- mysql 데이터베이스로 계정 정보 확인하기
# USE mysql;	-- 기본 적으로 제공되는 mysql database
#
# SELECT * FROM user;	-- mysql database에서 user를 확인해 계정이 추가된 것을 확인한다.
#
# -- 2) 데이터베이스 생성 후 계정에 권한 부여
# -- 데이터베이스(스키마) 생성
# CREATE DATABASE playground;
# -- CREATE SCHEMA playground;
#
# -- 왼쪽 Navigator를 새로고침해서 menudb database(schema)가 추가된 것을 확인한다.
# -- MySQL은 개념적으로 database와 schema를 구분하지 않는다.
# -- (CREATE DATABASE와 CREATE SCHEMA가 같은 개념이다.)
#
# GRANT ALL PRIVILEGES ON playground.* TO 'players'@'%';	-- menu에 대한 모든 권한 부여
#
# SHOW GRANTS FOR 'players'@'%';
#
# -- 3) 새로운 접속기 생성 후 접속하고 데이터베이스 활용하기
# -- 좌측 상단의 home 버튼을 눌러 players 계정 접속기를 만들어 접속하고 database(schema)를 사용한다.
# -- 접속기의 Connection Name은 'players'로 지정
# -- Parameters의 Username은 'players'로 지정(계정명)
# -- Default Schema(기본 데이터베이스(스키마) 설정)는 'menudb'로 지정
# USE playground;
-- --------------------------------------------------------
-- ddl
-- --------------------------------------------------------


drop table if exists tbl_authority;
create table if not exists tbl_authority
(
    -- column level constraints
    authority_code int auto_increment comment '권한식별코드',
    authority_name varchar(255) not null comment '권한명',
    authority_desc varchar(4000) not null comment '권한설명',
    -- table level constraints
    constraint pk_authority_code primary key (authority_code)
) engine=innodb comment '권한';

-- tbl_member_role(회원별권한)
drop table if exists tbl_member_role;
create table if not exists tbl_member_role
(
    -- column level constraints
    member_code int auto_increment comment '회원식별코드',
    authority_code int not null comment '권한식별코드',
    -- table level constraints
    constraint pk_member_role primary key (member_code, authority_code)
) engine=innodb comment '회원별권한';

# tbl_GameTable(매장 테이블)
drop table if exists tbl_GameTable;
create table if not exists `tbl_GameTable` (
	`table_code`	int NOT NULL	COMMENT '데이블코드',
	`table_name`	VARCHAR(255)	NOT NULL	COMMENT '테이블명',
	`max_people`	INT	NOT NULL	COMMENT '최대인원',
	`table_price`	INT	NOT NULL	COMMENT '시간요금'
);

# tbl_Notice(공지게시판)
drop table if exists tbl_Notice;
create table if not exists `tbl_Notice` (
	`notice_code`	int auto_increment	COMMENT '게시글코드',
	`member_code`	INT	NOT NULL	COMMENT '회원코드',
	`notice_title`	VARCHAR(255)	NOT NULL	COMMENT '제목',
	`notice_content`	VARCHAR(255)	NOT NULL	COMMENT '내용',
	`create_date`	VARCHAR(255)	NOT NULL		COMMENT '작성일',
	`modifyed_date`	VARCHAR(255)	NULL	COMMENT '수정일',
	`notice_category`	VARCHAR(255)	NOT NULL	COMMENT '카테고리',
    constraint pk_notice_code primary key (notice_code)
);

# tbl_Review(리뷰게시판)
drop table if exists tbl_Review;
create table if not exists `tbl_Review` (
	`review_code`	int auto_increment	COMMENT '리뷰코드',
	`member_code`	INT	NOT NULL	COMMENT '회원코드',
	`store_code`	INT	NOT NULL	COMMENT '매장코드',
	`review_title`	VARCHAR(255)	NOT NULL	COMMENT '제목',
	`review_content`	VARCHAR(255)	NOT NULL	COMMENT '내용',
	`create_date`	VARCHAR(255)	NOT NULL		COMMENT '작성일',
	`modifyed_date`	VARCHAR(255)	NULL	COMMENT '수정일',
	`review_star`	INT	NOT NULL	COMMENT '별점',
    constraint pk_review_code primary key (review_code)
);

# tbl_reply(댓글 게시판)
drop table if exists tbl_reply;
create table if not exists `tbl_reply` (
	`reply_code`	int auto_increment	COMMENT '댓글코드',
	`review_code`	INT	NOT NULL	COMMENT '리뷰코드',
	`member_code`	INT	NOT NULL	COMMENT '회원코드',
	`store_code`	INT	NOT NULL	COMMENT '매장코드',
	`reply_content`	VARCHAR(255)	NULL	COMMENT '내용',
	`create_date`	VARCHAR(255)	NOT NULL    COMMENT '작성일',
	`modifyed_date`	VARCHAR(255)	NULL	COMMENT '수정일',
    constraint pk_reply_code primary key (reply_code)

);


drop table if exists tbl_ReviewImage;
create table if not exists `tbl_ReviewImage` (
    `reviewImage_no` INT AUTO_INCREMENT primary key COMMENT '인조식별자',
	`image_url`	VARCHAR(255)	NOT NULL	COMMENT '이미지경로',
	`review_code`	int not null 	COMMENT '리뷰코드',
	`member_code`	INT	NOT NULL	COMMENT '회원코드',
	`store_code`	INT	NOT NULL	COMMENT '매장코드',
	`image_no`	INT	NOT NULL	DEFAULT 1	COMMENT '업로드순서'
);

drop table if exists tbl_NoticeImage;
create table if not exists `tbl_NoticeImage` (
    `noticeImage_no` INT AUTO_INCREMENT primary key COMMENT '인조식별자',
	`image_url`	VARCHAR(255)	NOT NULL	COMMENT '이미지경로',
	`notice_code`	int not null 	COMMENT '게시글코드',
	`member_code`	INT	NOT NULL	COMMENT '회원코드',
	`image_no`	INT	NOT NULL	DEFAULT 1	COMMENT '업로드순서'
);

drop table if exists tbl_Coopon;
create table if not exists `tbl_Coopon` (
	`coopon_code`	int auto_increment	COMMENT '쿠폰코드',
	`coopon_name`	VARCHAR(255)	NOT NULL	COMMENT '쿠폰명',
	`coopon_type`	VARCHAR(255)	NOT NULL	DEFAULT '금액'	COMMENT '쿠폰종류',
	`coopon_discount`	INT	NOT NULL	COMMENT '할인액',
	`coopon_period`	VARCHAR(255)	NOT NULL	COMMENT '유효기간',
	`Field`	VARCHAR(255)	NULL,
    constraint pk_coopon_code primary key (coopon_code)
);

# tbl_Grade(등급)
drop table if exists tbl_Grade;
create table if not exists `tbl_Grade` (
	`grade_code`	int auto_increment	COMMENT '등급코드',
	`grade_name`	VARCHAR(255)	NOT NULL	COMMENT '등급명',
	`grade_min_pay`	INT	NOT NULL	COMMENT '최소금액',
	`grade_max_pay`	INT	NOT NULL	COMMENT '최대금액',
	`mileage_percent`	INT	NOT NULL	COMMENT '마일리지비율',
    constraint pk_grade_code primary key (grade_code)
);

# tbl_BoardGame(보드게임)
drop table if exists tbl_BoardGame;
create table if not exists `tbl_BoardGame` (
	`boardgame_code`	int auto_increment	primary key 	COMMENT '보드게임코드',
	`boardgame_name`	VARCHAR(255)	NOT NULL	COMMENT '보드게임명',
	`difficulty`	VARCHAR(255)	NOT NULL	COMMENT '난이도',
	`release_date`	VARCHAR(255)	NULL	COMMENT '출시일',
	`min_player`	INT	NOT NULL	COMMENT '최소인원',
	`max_player`	INT	NOT NULL	COMMENT '최대인원',
	`playtime`	INT	NOT NULL	COMMENT '게임시간',
	`boardgame_rule`	VARCHAR(255)	COMMENT '게임설명',
	`boardgame_img_url1`	VARCHAR(255)	COMMENT '게임이미지1',
	`boardgame_img_url2`	VARCHAR(255)	COMMENT '게임이미지2',
	`boardgame_img_url3`	VARCHAR(255)	COMMENT '게임이미지3'
);

drop table if exists tbl_Menu;
create table if not exists `tbl_Menu` (
	`menu_code`	int auto_increment	COMMENT '메뉴코드',
	`menu_name`	VARCHAR(255)	NOT NULL	COMMENT '메뉴명',
	`category`	VARCHAR(255)	NOT NULL	COMMENT '카테고리',
	`menu_content`	VARCHAR(255)	NULL	COMMENT '메뉴설명',
	`menu_price`	INT	NOT NULL	COMMENT '메뉴가격',
	`orderable_status`	BOOLEAN	NOT NULL	DEFAULT false	COMMENT '주문가능상태',
    constraint pk_menu_code primary key (menu_code)
);

drop table if exists tbl_MenuImage;
create table if not exists `tbl_MenuImage` (
    `menuImage_no` INT AUTO_INCREMENT primary key COMMENT '인조식별자',
	`image_url`	VARCHAR(255)	NOT NULL	COMMENT '이미지경로',
	`menu_code`	INT	NOT NULL	COMMENT '메뉴코드',
	`image_no`	INT	NOT NULL	DEFAULT 1	COMMENT '업로드순서'
);

drop table if exists tbl_BoardGameImage;
create table if not exists `tbl_BoardGameImage` (
    `boardGameImage_no` INT AUTO_INCREMENT primary key COMMENT '인조식별자',
	`image_url`	VARCHAR(255)	NOT NULL	COMMENT '이미지경로',
	`boardgame_code`	VARCHAR(255)	NOT NULL	COMMENT '보드게임코드',
	`image_no`	INT	NOT NULL	DEFAULT 1	COMMENT '업로드순서'
);

drop table if exists tbl_Order;
create table if not exists `tbl_Order` (
	`order_code`	int auto_increment	COMMENT '주문코드',
	`order_date`	VARCHAR(255)	NOT NULL		COMMENT '주문일자',
	`order_time`	VARCHAR(255)	NOT NULL		COMMENT '주문시간',
	`order_total_pay`	INT	NOT NULL	COMMENT '총주문금액',
    constraint pk_order_code primary key (order_code)
);

drop table if exists tbl_Member;
create table if not exists `tbl_Member` (
	`member_code`	int auto_increment	COMMENT '회원코드',
	`member_id`	VARCHAR(255)	NOT NULL	COMMENT '회원아이디',
	`member_password`	VARCHAR(255)	NOT NULL	COMMENT '비밀번호',
	`member_nickname`	VARCHAR(255)	NOT NULL	COMMENT '닉네임',
	`member_birth`	VARCHAR(255)	NOT NULL	COMMENT '생년월일',
	`member_phone_number`	VARCHAR(255)	NOT NULL	COMMENT '연락처',
	`member_address`	VARCHAR(255)	NULL	COMMENT '주소',
	`member_email`	VARCHAR(255)	NULL	COMMENT '이메일',
	`member_visit_count`	INT	NULL	COMMENT '방문횟수',
    constraint pk_member_code primary key (member_code)
);

drop table if exists tbl_Payment;
create table if not exists `tbl_Payment` (
	`payment_code`	int auto_increment	COMMENT '결제코드',
	`payment_date`	VARCHAR(255)	NOT NULL		COMMENT '결제일',
	`payment_datetime`	VARCHAR(255)	NOT NULL		COMMENT '결제시간',
	`payment_total`	INT	NOT NULL	COMMENT '결제금액',
	`payment_type`	VARCHAR(255)	NOT NULL	COMMENT '결제구분',
	`mileage_get_point`	INT	NULL	COMMENT '마일리지적립금액',
	`mileage_used_point`	INT	NULL	COMMENT '마일리지사용금액',
    constraint pk_payment_code primary key (payment_code)
);

drop table if exists tbl_MemberCoopon;
create table if not exists `tbl_MemberCoopon` (
    `memberCoopoon_no` INT AUTO_INCREMENT primary key COMMENT '인조식별자',
	`member_code`	INT	NOT NULL	COMMENT '회원코드',
	`coopon_code`	INT	NOT NULL	COMMENT '쿠폰코드',
	`payment_code`	INT	NOT NULL	COMMENT '결제코드',
	`coopon_state`	BOOLEAN	NOT NULL	COMMENT '쿠폰사용여부'
);

drop table if exists tbl_Store;
create table if not exists `tbl_Store` (
	`store_code`	int auto_increment	COMMENT '매장코드',
	`store_name`	VARCHAR(255)	NOT NULL	COMMENT '매장명',
	`store_location`	VARCHAR(255)	NOT NULL	COMMENT '매장위치',
	`open_time`	VARCHAR(255)	NOT NULL	COMMENT '영업시작시간',
	`close_time`	VARCHAR(255)	NOT NULL	COMMENT '영업마감시간',
	`closed_day`	VARCHAR(255)	NOT NULL	DEFAULT '연중무휴'	COMMENT '휴무일',
    constraint pk_store_code primary key (store_code)
);

drop table if exists tbl_Manager;
create table if not exists `tbl_Manager` (
    `manager_no` INT AUTO_INCREMENT primary key COMMENT '인조식별자',
	`member_code`	INT	NOT NULL UNIQUE COMMENT '회원코드',
	`store_code`	INT	NOT NULL UNIQUE COMMENT '매장코드'
);

drop table if exists tbl_StoreMenu;
create table if not exists `tbl_StoreMenu` (
    `storeMenu_no` INT AUTO_INCREMENT primary key COMMENT '인조식별자',
	`store_code`	INT	NOT NULL	COMMENT '매장코드',
	`menu_code`	INT	NOT NULL	COMMENT '메뉴코드',
	`menu_count`	INT	NOT NULL	COMMENT '메뉴수량'
);

drop table if exists tbl_StoreBoardGame;
create table if not exists `tbl_StoreBoardGame` (
    `storeBoardGame_no` INT AUTO_INCREMENT primary key COMMENT '인조식별자',
    `store_code`	INT	NOT NULL	COMMENT '매장코드',
	`boardgame_code`	VARCHAR(255)	NOT NULL	COMMENT '보드게임코드',
	`boardgame_count`	INT	NOT NULL	COMMENT '보드게임수량',
	`boardgame_location`	VARCHAR(255)	NOT NULL	COMMENT '보드게임위치'
);

drop table if exists tbl_StoreGameTable;
create table if not exists `tbl_StoreGameTable` (
    `storeGameTable_no` INT AUTO_INCREMENT primary key COMMENT '인조식별자',
	`store_code`	INT	NOT NULL	COMMENT '매장코드',
	`table_code`	INT	NOT NULL	COMMENT '데이블코드',
	`table_count`	INT	NOT NULL	COMMENT '테이블수량'
);

drop table if exists tbl_OrderMenu;
create table if not exists `tbl_OrderMenu` (
    `orderMenu_no` INT AUTO_INCREMENT primary key COMMENT '인조식별자',
	`store_code`	INT	NOT NULL	COMMENT '매장코드',
	`table_code`	INT	NOT NULL	COMMENT '데이블코드',
	`menu_code`	INT	NOT NULL	COMMENT '메뉴코드',
	`order_code`	INT	NOT NULL	COMMENT '주문코드',
	`order_count`	INT	NOT NULL	COMMENT '주문수량'
);

drop table if exists tbl_OrderPayment;
create table if not exists `tbl_OrderPayment` (
    `orderPayment_no` INT AUTO_INCREMENT primary key COMMENT '인조식별자',
	`payment_code`	INT	NOT NULL	COMMENT '결제코드',
	`order_code`	INT	NOT NULL	COMMENT '주문코드'
);

drop table if exists tbl_MemberGrade;
create table if not exists `tbl_MemberGrade` (
    `memberGrade_no` INT AUTO_INCREMENT primary key COMMENT '인조식별자',
	`member_code`	INT	NOT NULL	COMMENT '회원코드',
	`grade_code`	INT	NOT NULL
);

drop table if exists tbl_reservation;
create table if not exists `tbl_reservation` (
	`reservation_code`	int auto_increment	COMMENT '에약코드',
	`member_code`	INT	NOT NULL	COMMENT '회원코드',
	`reservation_date`	VARCHAR(255)	NOT NULL	COMMENT '예약일자',
	`reservation_datetime`	VARCHAR(255)	NOT NULL	COMMENT '예약일시',
	`reservation_state`	VARCHAR(255)	NOT NULL	COMMENT '예약상태',
	`reservation_modify_date`	VARCHAR(255)	NULL	COMMENT '수정일자',
	`reservation_modify_datetime`	VARCHAR(255)	NULL	COMMENT '수정일시',
	`start_time`	VARCHAR(255)	NOT NULL	COMMENT '사용시작시간',
	`end_time`	VARCHAR(255)	NOT NULL	COMMENT '사용종료시간',
    constraint pk_reservation_code primary key (reservation_code)
);

drop table if exists tbl_StoreReservation;
create table if not exists `tbl_StoreReservation` (
    `storeReservation_no` INT AUTO_INCREMENT primary key COMMENT '인조식별자',
	`reservation_code`	INT	NOT NULL	COMMENT '에약코드',
	`member_code`	INT	NOT NULL	COMMENT '회원코드',
	`store_code`	INT	NOT NULL	COMMENT '매장코드',
	`table_code`	INT	NOT NULL	COMMENT '데이블코드'
);

drop table if exists tbl_reservationPayment;
create table if not exists `tbl_reservationPayment` (
    `reservationPayment_no` INT AUTO_INCREMENT primary key COMMENT '인조식별자',
	`reservation_code`	INT	NOT NULL	COMMENT '에약코드',
	`member_code`	INT	NOT NULL	COMMENT '회원코드',
	`store_code`	INT	NOT NULL	COMMENT '매장코드',
	`table_code`	INT	NOT NULL	COMMENT '데이블코드',
	`payment_code`	INT	NOT NULL	COMMENT '결제코드'
);

drop table if exists tbl_GamePayment;
create table if not exists `tbl_GamePayment` (
    `GamePayment_no` INT AUTO_INCREMENT primary key COMMENT '인조식별자',
	`store_code`	INT	NOT NULL	COMMENT '매장코드',
	`table_code`	INT	NOT NULL	COMMENT '데이블코드',
	`payment_code`	INT	NOT NULL	COMMENT '결제코드'
);

#--------board game----------------#
# TRUNCATE TABLE tbl_boardgame;
# ALTER TABLE tbl_boardgame MODIFY COLUMN boardgame_code BIGINT AUTO_INCREMENT;
#
