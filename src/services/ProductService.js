const Product = require("../models/ProductModel");
const bcrypt = require('bcrypt');


const createProduct = (newProduct)=>{
    return new Promise( async(resolve, reject)=>{
        const {name, image,type, price, countInStock,rating,description,discount} = newProduct
        try {
            const checkProduct = await Product.findOne({
                name:name
            })
            if(checkProduct !== null){
                resolve({
                    status:'OK',
                    message:'The checkProduct is already'
                })
            }
            
            const createProduct = await Product.create({
                name,
                image,
                type,
                price,
                countInStock,
                rating,
                description,
                discount
            })
            if(createProduct){
                resolve({
                    status:'OK',
                    message :'SUCCESS',
                    data: createProduct
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
const updateProduct = (id,data)=>{
    
    return new Promise( async(resolve, reject)=>{
        try {
            const checkProduct = await Product.findOne({
                _id : id
            })
           console.log('checkProduct',checkProduct);
           if(checkProduct === null){
             resolve({
                    status:'OK',
                    message :'The product is not defined',
                })
            }
            
            const updateProduct = await Product.findByIdAndUpdate(id,data, {new: true});
            console.log('updateUser',updateProduct);
            resolve({
                status:'OK',
                message :'SUCCESS',
                data: updateProduct
            })
            // }

           
        } catch (e) {
            reject(e)
        }
    })
}
const getDetailsProduct = (id)=>{
    return new Promise( async(resolve, reject)=>{
        try {
            const product = await Product.findOne({
                _id : id
            })
        
           if(product === null){
             resolve({
                    status:'OK',
                    message :'The product is not defined',
                })
            }
            resolve({
                status:'OK',
                message :'SUCCESS',
                data:product
                
            })
           
        } catch (e) {
            reject(e)
        }
    })
}
const deleteProduct = (id)=>{
    
    return new Promise( async(resolve, reject)=>{
        try {
            const checkProduct = await Product.findOne({
                _id : id
            })
           if(checkProduct === null){
             resolve({
                    status:'OK',
                    message :'The product is not defined',
                })
            }
            await Product.findByIdAndDelete(id);
            resolve({
                status:'OK',
                message :'Delete product success',
                
            })
           
        } catch (e) {
            reject(e)
        }
    })
}

const deleteManyProduct = (ids)=>{
    console.log('iddProduct',ids);
    
    return new Promise( async(resolve, reject)=>{
        try {
      
            
            await Product.deleteMany({_id: ids});
            resolve({
                status:'OK',
                message :'Delete product success',
                
            })
           
        } catch (e) {
            reject(e)
        }
    })
}

const getAllProduct = (limit, page, sort,filter)=>{
    
    return new Promise( async(resolve, reject)=>{
        
        try {
            const totalProduct = await Product.count()
            let allProduct =[]
            if(filter){
                const label = filter[0];
                const allProductFilter = await Product.find({
                    [label]: {'$regex': filter[1]}
                }).limit(limit).skip(page * limit)
                resolve({
                    status:'OK',
                    message :'Success',
                    data: allProductFilter,
                    total:totalProduct,
                    pageCurrent: page+ 1,
                    totalPage : Math.ceil(totalProduct/limit)
                })
            }
            if(sort){
                const objectSort = {}
                objectSort[sort[1]]=sort[0]
                
                const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort)
                resolve({
                    status:'OK',
                    message :'Success',
                    data: allProductSort,
                    total:totalProduct,
                    pageCurrent: page+ 1,
                    totalPage : Math.ceil(totalProduct/limit)
                })
            }
          //dùng limit để  paginated
          if(!limit){

              allProduct = await Product.find() 
          }else{
            allProduct = await Product.find().limit(limit).skip(page * limit)

          }
            resolve({
                status:'OK',
                message :'Success',
                data: allProduct,
                total:totalProduct,
                pageCurrent: page+ 1,
                totalPage : Math.ceil(totalProduct/limit)
            })
           
        } catch (e) {
            reject(e)
        }
    })
}

const getAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Product.distinct('type')
            resolve({
                status: 'OK',
                message: 'Success',
                data: allType,
            })
        } catch (e) {
            reject(e)
        }
    })
}


getAllType
module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    deleteManyProduct,
    getAllType
}