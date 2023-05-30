const defaultController = async (req, res) => {
    res.status(200).send({
        message: {
            data: "This is the default endpoint",
            name: "API for Mini Blog V1"
        },

    });
}

export default defaultController;