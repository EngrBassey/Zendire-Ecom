
import classes from './addproduct.module.css';
import Footer from '../../components/Footer/Footer'
import { useNavigate } from 'react-router-dom';

const Removeproduct = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();
    };
    const navigate = useNavigate();

  return (
    <div className={classes.container}>
    <div className={classes.addproduct}>
        <ul>
            <h1>Remove Product</h1>
            <form onSubmit={handleSubmit}>
                <div className={classes.formGroup}>
                    <label>SKU<span>*</span></label>
                    <input
                        type='text'
                        required
                    />
                </div>
                <div className={classes.apibtn}>
                    <button type='submit'>Remove Product</button>
                    <button type='submit' onClick={() => navigate('/addproduct')}>Add Product</button>
                </div>
            </form>
        </ul>
    </div>
    <Footer />
</div>
  )
}

export default Removeproduct
