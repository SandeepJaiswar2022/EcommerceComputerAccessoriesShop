import React, { useEffect } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CustomProduct from '../CustomProduct/CustomProduct';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../../State/Product/ProductSlice';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 575 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 575, min: 0 },
        items: 1
    }
};

function ProductSlider({ rem, title = `In Offer` }) {

    const dispatch = useDispatch();
    const product = useSelector(store => store.product);

    useEffect(() => {
        dispatch(getAllProducts());
        console.log("Get All Product Called ");
    }, [])
    let splittedProducts = [];
    if (rem == 0) {
        splittedProducts = product.products?.filter(product => product.id % 2 === 0);
    }
    else {
        splittedProducts = product.products?.filter(product => product.id % 2 !== 0);
    }

    return (
        <div key={title} className="mb-8 relative container md:px-8 lg:px-12 py-8 px-4 justify-between items-center">
            <div className='flex items-center justify-center'>
                <div className="flex mb-10 items-center justify-center lg:w-1/4 md:w-1/3 sm:w-2/3">
                    {/* Border Thicker */}
                    <div className="flex-1 border-t-2 inline-block border-white"></div>
                    <h3 className="tracking-tighter lg:text-xl md:text-lg sm:text-sm font-bold mx-4 text-white">{title}</h3>
                    <div className="flex-1 border-t-2 border-white"></div>
                </div>
            </div>

            <Carousel arrows={true} responsive={responsive}>
                {splittedProducts?.map((product) =>
                    (<CustomProduct key={product.id} product={product} />))
                }
            </Carousel>;
        </div>
    )
}

export default ProductSlider
