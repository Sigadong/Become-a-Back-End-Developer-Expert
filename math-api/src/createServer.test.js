const createServer = require('./createServer');
const MathBasic = require('./MathBasic');
const FigureCalculator = require('./FigureCalculator');

describe('A HTTP Server', () => {
  describe('when GET /add', () => {
    it('should respond with a status code of 200 and the payload value is addition result of a and b correctly', async () => {
      // Arrange
      const a = 10;
      const b = 20;
      const spyAdd = jest.spyOn(MathBasic, 'add');
      const server = createServer({ mathBasic: MathBasic });

      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/add/${a}/${b}`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(30);
      expect(spyAdd).toBeCalledWith(a, b);
    });
  });

  describe('when GET /subtract', () => {
    it('should respond with a status code of 200 and the payload value is subtraction result of a and b correctly', async () => {
      // Arrange
      const a = 12;
      const b = 8;
      const spySubtract = jest.spyOn(MathBasic, 'subtract');
      const server = createServer({ mathBasic: MathBasic });
      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/subtract/${a}/${b}`,
      });
      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(4); // a - b
      expect(spySubtract).toBeCalledWith(a, b);
    });
  });

  describe('when GET /multiply', () => {
    it('should respond with a status code of 200 and the payload value is multiplying result of a and b correctly', async () => {
      // Arrange
      const a = 5;
      const b = 6;
      const spyMultiply = jest.spyOn(MathBasic, 'multiply');
      const server = createServer({ mathBasic: MathBasic });
      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/multiply/${a}/${b}`,
      });
      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(30); // a * b
      expect(spyMultiply).toBeCalledWith(a, b);
    });
  });

  describe('when GET /divide', () => {
    it('should respond with a status code of 200 and the payload value is divided result of a and b correctly', async () => {
      // Arrange
      const a = 25;
      const b = 5;
      const spyDivide = jest.spyOn(MathBasic, 'divide');
      const server = createServer({ mathBasic: MathBasic });
      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/divide/${a}/${b}`,
      });
      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(5); // a / b
      expect(spyDivide).toBeCalledWith(a, b);
    });
  });

  describe('when GET /rectangle/perimeter', () => {
    it('should respond with a status code of 200 and the payload value is the result of calculating the perimeter of the rectangle correctly', async () => {
      // Arrange
      const length = 10;
      const width = 30;
      const figureCalculator = new FigureCalculator(MathBasic);
      const spycalculateRectanglePerimeter = jest.spyOn(figureCalculator, 'calculateRectanglePerimeter');
      const server = createServer({ figureCalculator });
      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/rectangle/perimeter/${length}/${width}`,
      });
      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(80); // 2 x (length + width)
      expect(spycalculateRectanglePerimeter).toBeCalledWith(length, width);
    });
  });

  describe('when GET /rectangle/area', () => {
    it('should respond with a status code of 200 and the payload value is the result of calculating the area of the rectangle correctly', async () => {
      // Arrange
      const length = 8;
      const width = 5;
      const figureCalculator = new FigureCalculator(MathBasic);
      const spycalculateRectangleArea = jest.spyOn(figureCalculator, 'calculateRectangleArea');
      const server = createServer({ figureCalculator });
      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/rectangle/area/${length}/${width}`,
      });
      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(40); // length * width
      expect(spycalculateRectangleArea).toBeCalledWith(length, width);
    });
  });

  describe('when GET  /triangle/perimeter', () => {
    it('should respond with a status code of 200 and the payload value is the result of calculating the perimeter of the triangle correctly', async () => {
      // Arrange
      const sideA = 6;
      const sideB = 2;
      const base = 4;
      const figureCalculator = new FigureCalculator(MathBasic);
      const spycalculateTrianglePerimeter = jest.spyOn(figureCalculator, 'calculateTrianglePerimeter');
      const server = createServer({ figureCalculator });
      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/triangle/perimeter/${sideA}/${sideB}/${base}`,
      });
      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(12); // sideA + sideB + base
      expect(spycalculateTrianglePerimeter).toBeCalledWith(sideA, sideB, base);
    });
  });

  describe('when GET  /triangle/area', () => {
    it('should respond with a status code of 200 and the payload value is the result of calculating the area of the triangle correctly', async () => {
      // Arrange
      const base = 5;
      const height = 6;
      const figureCalculator = new FigureCalculator(MathBasic);
      const spycalculateTriangleArea = jest.spyOn(figureCalculator, 'calculateTriangleArea');
      const server = createServer({ figureCalculator });
      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/triangle/area/${base}/${height}`,
      });
      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(15); // (base * height) / 2
      expect(spycalculateTriangleArea).toBeCalledWith(base, height);
    });
  });
});
