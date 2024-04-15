const Product = require ('./ProductModel');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

const getProducts= (req,res,next)=>{
    Product.find()
    .then(response => {
        res.json({ response });
    })
    .catch(error => {
        res.json({ message: error });
    });
};


const addProducts = (upload.array('images', 5), (req, res, next) => {
    
    const {
        ProductId, ProductName, Catagory, Price, Ratings, Sizes, Colors, ImgUrls
    } = req.body;

    const product = new Product({
        ProductId: ProductId,
        ProductName: ProductName,
        Catagory: Catagory,
        Price: Price,
        Sizes: Catagory === 'shoes' ? Sizes : [],
        Colors: Catagory === 'bags' ? Colors : [],
        ImgUrls: req.files.map(file => {
            const imageBuffer = file.buffer;
            return `data:image/png;base64,${imageBuffer.toString('base64')}`;
        }),
    });

    product.save()
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.json({ error });
        });
});


const updateProduct = (req,res,next)=>{
    const ProductId = req.params.ProductId;
    const{ Price,Ratings,Sizes,Colors}=req.body;

    Product.findOneAndUpdate(
        {ProductId:ProductId},
        {$set:{Price:Price,Ratings:Ratings,Sizes:Sizes,Colors:Colors}},
        {new:true}

    )

    .then(response => {
        res.json({ response });
    })
    .catch(error => {
        res.json({ error });
    });

}


const deleteproduct = (req,res,next)=>{
    const ProductId = req.body.ProductId;

    Product.deleteOne({
        ProductId:ProductId
    })
    .then(response => {
        res.json({ response });
    })
    .catch(error => {
        res.json({ error });
    });
}


module.exports={getProducts,addProducts,updateProduct,deleteproduct}