import classes from './addproduct.module.css';
import Footer from '../../components/Footer/Footer'

const Update = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    return (
        <div className={classes.container}>
            <div className={classes.addproduct}>
                <ul>
                    <h1>Update Product</h1>
                    <form onSubmit={handleSubmit}>
                        <div className={classes.formGroup}>
                            <label>SKU<span>*</span></label>
                            <input
                                type='text'
                                required
                            />
                        </div>
                        <div className={classes.formGroup}>
                            <label>Product Name<span>*</span></label>
                            <input
                                type='text'
                                required
                            />
                        </div>
                        <div className={classes.formGroup}>
                            <label>Prodcts No. availble<span>*</span></label>
                            <input
                                type='number'
                                required
                            />
                        </div>
                        <div className={classes.formGroup}>
                            <label>Price<span>*</span></label>
                            <input
                                type='number'
                                required
                            />
                        </div>
                        <div className={classes.formGroup}>
                            <label>Image<span>*</span></label>
                            <input
                                type='file'
                                required
                            />
                        </div>
                        <div className={classes.apibtn}>
                            <button type='submit'>Update Product</button>
                        </div>
                    </form>
                </ul>
            </div>
            <Footer />
        </div>
    )
}

export default Update
