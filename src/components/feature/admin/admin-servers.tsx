import { Card } from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const SERVER_COLUMNS = [
  { key: "server", header: "서버" },
  { key: "os", header: "OS" },
  { key: "webServer", header: "웹 서버" },
  { key: "platform", header: "플랫폼" },
  { key: "status", header: "상태", className: "text-center" },
];

const SERVER_ROWS = [
  {
    server: "www.catholic.or.kr",
    os: "Windows Server 2003",
    webServer: "IIS 6.0",
    platform: "Classic ASP 3.0",
    status: <Badge variant="green">운영중</Badge>,
  },
  {
    server: "maria.catholic.or.kr",
    os: "Windows Server 2008",
    webServer: "IIS 7.0",
    platform: "Classic ASP 3.0",
    status: <Badge variant="green">운영중</Badge>,
  },
  {
    server: "bbs.catholic.or.kr",
    os: "Windows Server 2003",
    webServer: "IIS 6.0",
    platform: "Classic ASP 3.0",
    status: <Badge variant="notice">주의</Badge>,
  },
  {
    server: "DB Server",
    os: "Windows Server 2008",
    webServer: "MS-SQL 2008",
    platform: "SP4",
    status: <Badge variant="green">운영중</Badge>,
  },
];

export function AdminServers() {
  return (
    <Card title="서버 현황">
      <Table columns={SERVER_COLUMNS} rows={SERVER_ROWS} />
    </Card>
  );
}
