export default [
  {
    url: "/dev-api/api/page",
    method: "post",
    response: () => {
      return {
        code: 200,
        data: {
          pageNo: 1,
          pageSize: 10,
          total: 4,
          result: [
            {
              id: 1,
              name: "接口1",
              url: "learn/login",
              model: "learn",
              status: 0,
            },
            {
              id: 2,
              name: "接口2",
              url: "learn/loginOut",
              model: "learn",
              status: 1,
            },
            {
              id: 3,
              name: "接口3",
              url: "learn/api/page",
              model: "learn",
              status: 0,
            },
            {
              id: 4,
              name: "接口4",
              url: "practice/menu/page",
              model: "practice",
              status: 0,
            },
          ],
        },
      };
    },
  },
];
