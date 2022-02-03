class ExampleController {
  static helloWorld(req, res) {
    res.status(200).json({
      message: 'Hello my API',
    });
  }
}

export default ExampleController;
