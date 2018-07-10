const DICTYPE = {
  CTCCD0120: 'CTC-CD0120',//机构注册客户来源
  CTCCD0026: "CTC-CD0026",//关联方类型代码
  CTCCD0058: "CTC-CD0058",//地址类型代码
  CTCCD0059: "CTC-CD0059",//联系方式代码
  CTCCD0091: "CTC-CD0091",//投行项目来源（客户来源）
  CTCCD0092: "CTC-CD0092",//股融项目类型
  CTCCD0093: "CTC-CD0093",//项目阶段（股融、新三板）
  CTCCD0094: "CTC-CD0094",//企业性质
  CTCCD0095: "CTC-CD0095",//我司角色  （股融）
  CTCCD0096: "CTC-CD0096",//上市板块
  CTCCD0097: "CTC-CD0097",//审核结果
  CTCCD0098: "CTC-CD0098",//新三板项目类型
  CTCCD0099: "CTC-CD0099",//所属分层
  CTCCD0100: "CTC-CD0100",//发行方式
  CTCCD0101: "CTC-CD0101",//债融项目类型（存续期）
  CTCCD0102: "CTC-CD0102",//项目阶段（债融）
  CTCCD0103: "CTC-CD0103",//债融公司类型
  CTCCD0104: "CTC-CD0104",//债券承销角色
  CTCCD0105: "CTC-CD0105",//存续期风险分类
  CTCCD0106: "CTC-CD0106",//评级展望
  CTCCD0107: "CTC-CD0107",//投行项目融资类型
  CTCCD0108: "CTC-CD0108",//投行统计口径
  CTCCD0109: "CTC-CD0109",//QFII客户行业
  CTCCD0110: "CTC-CD0110",//研究中心客户大类
  CTCCD0111: "CTC-CD0111",//研究中心客户小类
  CTCCD0112: "CTC-CD0112",//我司角色（新三板）
  CTCCD0113: "CTC-CD0113",//登记客户类型
  CTCCD0114: "CTC-CD0114",//合作单位性质
  CTCCD0115: "CTC-CD0115",//持续督导类型
  CTCCD0116: "CTC-CD0116",//发行人评级展望
  CTCCD0117: "CTC-CD0117",//存续期我司角色
  CTCCD0118: "CTC-CD0118",//公募基金管理性质
  CTCCD0119: "CTC-CD0119",//私募机构类型
  CTCCD0200: "CTC-CD0200",//指标编号
  CTCCD0201: "CTC-CD0201",//关系类型
  CTCCD0202: "CTC-CD0202",//账户类别
  CTCCD0203: "CTC-CD0203",//日历类型
  CTCCD0204: "CTC-CD0204",//注册客户来源
  CTCCD0205: "CTC-CD0205",//客户数据来源
  CTCCD0206: "CTC-CD0206",//管理级别
  CTCCD0207: "CTC-CD0207",//来源
  CTCCD0208: "CTC-CD0208",//信用标志
  CTCCD0209: "CTC-CD0209",//权限编号
  CTCCD0210: "CTC-CD0210",//实体主题
  CTCCD0211: "CTC-CD0211",//金汇客户类型
  CTCCD0212: "CTC-CD0212",//客户来源
  CTCCD0213: "CTC-CD0213",//重要程度
  CTCCD0214: "CTC-CD0214",//分组级别
  CTCCD0215: "CTC-CD0215",//资管客户级别
  CTCCD0216: "CTC-CD0216",//资管客户类型
  CTCCD0217: "CTC-CD0217",//增发进度
  CTCCD0218: "CTC-CD0218",//相似客户关联类型
  CTCCD0219: "CTC-CD0219",//转正标志
  CTCCD0220: "CTC-CD0220",//投行潜客来源
  CTCCD0221: "CTC-CD0221",//股票市场
  CTCCD0222: "CTC-CD0222",//潜在客户状态
  CTCCD0223: "CTC-CD0223",//交易所
  CTCCD0232: "CTC-CD0232",//万德一级行业
  CTCCD0233: "CTC-CD0233",//万德二级行业
  CTCCD0234: "CTC-CD0234",//证监会行业分类（大）
  CTCCD0235: "CTC-CD0235",//证监会行业分类（中）
  CTCCD0236: "CTC-CD02TC-CD0236",//Wind债券一级分类
  CTCCD0237: "CTC-CD0237",//Wind债券二级分类
  CTCCD0240: "CTC-CD0240",//上市板块/上市地点
  CTCCD0241: "CTC-CD0241",//产品中心机构类型
  CTCCD0242: "CTC-CD0242",//保险客户来源
  CTCCD0243: "CTC-CD0243",//定向客户类型
  CTCCD0244: "CTC-CD0244",//标签更新频率
  CTCCD0245: "CTC-CD0245",//标签重要程度
  CTCCD0246: "CTC-CD0246",//标签类型
  CTCCD0247: "CTC-CD0247",//标签来源
  CTCCD0248: "CTC-CD0248",//标签粒度
  CTCCD0249: "CTC-CD0249",//标签状态
  CTCCD0250: "CTC-CD0250",//操作类型
  CTCCD0251: "CTC-CD0251",//标签分类级别
  CTCCD0252: "CTC-CD0252",//标签时间周期
  CTCCD0253: "CTC-CD0253",//标签规则类型
  CTCCD0254: "CTC-CD0254",//标签字段类型
  CTCCD0255: "CTC-CD0255",//定向产品管理类型
  CTCCD0256: "CTC-CD0256",//实体字段类型
  CTCCD0999: "CTC-CD0999",//是否\
  EDW10070: "EDW-10070",// 联系方式
  EDW10071: "EDW-10071", // 地址类型
  EDW10007: "EDW-10007",//国籍代码
  EDW10013: "EDW-10013",//交易市场代码
  EDW10014: "EDW-10014",//交易所代码
  EDW10015: "EDW-10015",//客户类型
  EDW10016: "EDW-10016",//个人标志
  EDW10017: "EDW-10017",//客户性质
  EDW10024: "EDW-10024",//性别代码
  EDW10025: "EDW-10025",//学历代码
  EDW10030: "EDW-10030",//客户状态
  EDW10031: "EDW-10031",//证件类型
  EDW10044: "EDW-10044",//婚姻状况
  EDW10047: "EDW-10047",//民族代码
  EDW10062: "EDW-10062",//执业资格类型
  EDW10064: "EDW-10064",//开通业务类型
  EDW10066: "EDW-10066",//休眠标志
  EDW20075: "EDW-20075",//开户方式
  EDW20083: "EDW-20083",//法人类别
  EDW20102: "EDW-20102",//风险因素
  EDW20209: "EDW-20209",//客户分类
  EDW20210: "EDW-20210",//客户分组
  EDW20211: "EDW-20211",//客户PrdTermClass
  EDW20215: "EDW-20215",//客户来源
  EDW20251: "EDW-20251",//企业类别
  EDW20436: "EDW-20436",//职业类型
  EDW20473: "EDW-20473",//职业代码
  EDW20504: "EDW-20504",//行业代码
  EDW20520: "EDW-20520",//委托类型
  EDW20521: "EDW-20521",//从业资格
  EDW20540: "EDW-20540",//反洗钱等级
  EDW20563: "EDW-20563",//客户级别
  EDW20567: "EDW-20567",//客户大级别
  EDW20577: "EDW-20577",//风险承受能力
  EDW20581: "EDW-20581",//活跃度分类
  EDW20759: "EDW-20759",//操作方式
  EDW20789: "EDW-20789",//客户投资期限
  EDW20799: "EDW-20799",//金融产品风险等级
  EDW20811: "EDW-20811",//兴趣爱好
  EDW20813: "EDW-20813",//服务级别
  EDW20842: "EDW-20842",//收益类型
  EDW20912: "EDW-20912",//行业大类
  EDW20913: "EDW-20913",//行业子类
  EDW20914: "EDW-20914",//职业大类
  EDW20915: "EDW-20915",//职业子类
  EDW20916: "EDW-20916",//年均收入区间
  EDW20920: "EDW-20920",//反洗钱类型
  EDW20921: "EDW-20921",//专业投资者来源
  EDW20923: "EDW-20923",//主体身份
  EDW20926: "EDW-20926",//国有属性
  EDW20927: "EDW-20927",//上市属性
  EDW20935: "EDW-20935",//资产属性
  EDW30004: "EDW-30004",//新证券类别
  EDW50000: "EDW-50000",//来源系统
  EDW50018: "EDW-50018",//资产分档代码
  EDW50036: "EDW-50036",//客户员工关系类型
  EDW50037: "EDW-50037",//星座
  EDW50038: "EDW-50038",//客户所属人生阶段
  EDW20790: "EDW-20790",//专业投资者类型
  OSPCD0217: "OSP-CD0217",//服务关系类型
  OSPCD0218: "OSP-CD0218",//业务方向
  OSPCD0219: "OSP-CD0219",//联系人类型
  OSPCD0220: "OSP-CD0220",//商机活动类型
  OSPCD0221: "OSP-CD0221",//商机活动方式
  OSPCD0222: "OSP-CD0222",//商机活动状态
  OSPCD0223: "OSP-CD0223",//资源类别
  OSPCD0224: "OSP-CD0224",//商机知识类别
  OSPCD0225: "OSP-CD0225",//公司部门
  OSPCD0226: "OSP-CD0226",//业务类别
  OSPCD0227: "OSP-CD0227",//服务类别
  OSPCD0228: "OSP-CD0228",//商机状态
  OSPCD0229: "OSP-CD0229",//优先级
  OSPCD0230: "OSP-CD0230",//应答方式
  OSPCD0231: "OSP-CD0231",//协同响应模式
  CTCCD0998: "CTC-CD0998", //机构编号和名称关系
  OSPCD0232: "OSP-CD0232", //金融产品分类
  OSPCD0235:"OSP-CD0235",	 //产品类型
  OSPCD0233:"OSP-CD0233",//产品状态
  OSPCD0234:"OSP-CD0234",//销售系统
  EDW50003:"EDW-50003",//业务类型
  EDW20799: "EDW-20799", // 证券方风险等级
  OSPCD0236: "OSP-CD0236", // 实物贵金属类别
  OSPCD0237: "OSP-CD0237", // 快递费收费模式
  OSPCD0238: "OSP-CD0238", // 投资品种
  OSPCD0239: "OSP-CD0239", // 支付方式
  OSPCD0240: "OSP-CD0240", // 成色
  OSPCD0241: "OSP-CD0241", // 快递公司
  OSPCD0242: "OSP-CD0242", // 交易状态
  OSPCD0243: "OSP-CD0243", // 签约方式
  OSPCD0244: "OSP-CD0244", // 材质
  OSPCD0245: "OSP-CD0245", // 准入投资者类型
  OSPCD0246: "OSP-CD0246", // 评价风险等级
  OSPCD0247: "OSP-CD0247", // 承销关系
  OSPCD0248: "OSP-CD0248", // 计价方式
  EDW100422:"EDW-100422",//银行代码

};

export default DICTYPE;