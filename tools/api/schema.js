export default {
  "type": "object",
  "properties": {
    "users": {
      "type": "array",
      "minItems": 5,
      "maxItems": 10,
      "uniqueItems": true,
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "minimum": 1,
          },
          "name": {
            "type": "string",
            "faker": "name.findName"
          },
          "email": {
            "type": "string",
            "faker": "internet.email"
          },
          "avatar":{
            "type": "string",
            "faker": "internet.avatar"
          }
        },
        "required": ["id", "name", "email", "avatar"]
      }
    }
  },
  "required": ["users"]
};