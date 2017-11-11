const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {

  let reportData = {
    header: {
      title: '“鉴势”工控系统信息安全核查报告',
      district: '杭州市'
    },
    body: {
      introduction: {
        subtitle: '企业（部门）相关情况',
        description: [{
          field: '名 称',
          val: 'XX 部门'
        }, {
          field: '地 区',
          val: '杭州市， 浙江省， 中 国'
        }, {
          field: '联系电话',
          val: '00000000'
        }, {
          field: '邮 箱',
          val: 'example@hdu.edu.cn'
        }]
      },
      totalStatus: {
        subtitle: '系统总体情况',
        data: {
          tableFlag: 'ts',
          head: ['系统类别', '数 量', '备 注'],
          content: [
            ['SCADA', 10, '主要用于XX用途'],
            ['DCS', 8, ' '],
            ['PLC', 3, ' ']
          ],
          op: {
            col: [1, 1, 3] // partition of tableWidth
          }
        }
      },
      riskStatus: {
        subtitle: '系统风险评分',
        data: {
          score: {
            security: 55,
            system: 87,
            network: 72
          }
        }
      },
      bugDetails: {
        subtitle: '系统漏洞详情',
        data: {
          tableFlag: 'bd',
          head: ['序 号', 'CNVD-ID', '标 题', '发布时间', '等 级', '漏洞描述', '影响产品'],
          content: [
            [
              1, 'CNVD-2017-22083', 'Schneider Electric Trio TView Software存在dll劫持漏洞', '2017-09-23',
              '中', 'Schneider Electric Trio TView Software是一款虚拟诊断软件。Schneider Electric Trio TView Software存在dll劫持漏洞。该漏洞是由于Trio TView Software应用包含的DLL未能指定绝对路径所致，允许攻击者利用漏洞构建恶意应用，置放在特定路径中，使应用恶意加载DLL并执行。', 'Schneider Electric Trio TView Software 3.29.0'
            ],
            [
              2, 'CNVD-2017-27960', 'Saia Burgess Controls PCD Controllers信息泄露漏洞', '2017-09-22', '中', 'PCD Controller是瑞士Saia Burgess Controls公司的一款用于测量、调节和控制任务的可编程控制器系列产品。Saia Burgess Controls PCD Controllers 存在信息泄露漏洞，攻击者可利用漏洞在内存中获取敏感信息。', '"Saia Burgess Controls PCD Controllers <1.28.16 Saia Burgess Controls PCD Controllers < 1.24 .69'
            ],
            [
              3, 'CNVD-2017-27937', 'Schneider Electric InduSoft Web Studio和InTouch Machine Edition远程代码执行漏洞', '2017-09-22', '高', 'InduSoft Web Studio和InTouch Machine Edition都是法国施耐德电气（Schneider Electric）公司的一个嵌入式HMI软件包。Schneider Electric InduSoft Web Studio和InTouch Machine Edition存在远程代码执行漏洞，InduSoft Web Studio提供了HMI客户端在服务器上触发脚本执行的功能，以执行自定义的计算或操作。远程攻击者可绕过服务器认证并触发任意命令的执行。该命令在高权限下执行，可能导致服务器的完全妥协。', 'Schneider Electric InduSoft Web Studio <=8.0 SP2 Schneider Electric InTouch Machine Edition <=8.0 SP2'
            ],
            [
              4, 'CNVD-2017-27938', 'Ctek SkyRouter身份验证绕过漏洞', '2017-09-22', '高', 'SkyRouter是瑞典CTEK公司的一款用于管理无线IP连接的产品。Ctek SkyRouter存在身份验证绕过漏洞，通过访问Web服务器上的特定统一资源定位符（URL），攻击者可利用漏洞绕过身份验证限制进而访问应用程序。', 'Ctek SkyRouter Series 4200 <6.00.11 Ctek SkyRouter Series 4400 <6.00.11'
            ],
            [
              5, 'CNVD-2017-27939', 'Digium Asterisk GUI OS命令注入漏洞', '2017-09-22', '高', 'Asterisk GUI是一款用于配置图形用户界面的框架。Digium Asterisk GUI存在OS命令注入漏洞，攻击者可通过在程序的URL请求中注入OS命令，从而在系统上执行任意代码。', 'Digium Asterisk GUI <=2.1.0'
            ]
          ],
          op: {
            col: [1, 2, 2, 2, 1, 5, 4] // partition of tableWidth
          }
        }
      },
      conclusion: {
        subtitle: '结 论',
        data: {
          head: '综上，系统主要存在以下问题，并针对问题提出解决建议如下：',
          problems: [
            '高危漏洞较多，系统存在风险，部门应做好网络安全防护工作',
            '系统可以优化，将部分软件升级到最新版本以修复漏洞',
            '禁止设备违规连入互联网'
          ]
        }
      }

    },
    footer: {
      msg: 'COPYRIGHT 2017 HDU TEAM OF TRACE SEEKERS, All rights reserved.'
    }
  };

  res.json(reportData);
  console.log('data sent');

});

module.exports = router;