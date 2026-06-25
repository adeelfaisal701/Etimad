import ProductCard from '../../components/product_card';
import printed from "../../assets/printed.jpg";
import embroidered from "../../assets/embroidered.jpg";
import party from "../../assets/party.jpg";
import bridal from "../../assets/bridal.jpg";
import perfume from "../../assets/perfume.jpg";
import cosmetics from "../../assets/cosmetics.jpg";
import jewellery from "../../assets/jewellery.jpg";
import bags from "../../assets/bags.jpg";
import skincare from "../../assets/skincare.jpg";
import CardsSection from '../../old_src/components/CardsSection';
import CategoriesBar from '../../old_src/components/CategoriesBar';
import { useTranslation } from "react-i18next";

const products=[
{name:'Bags',price:800,seller:'Tech World',image:bags},
{name:'Printed Dress',price:800,seller:'Tech World',image:printed},
{name:'Embroiderd',price:800,seller:'Tech World',image:embroidered},
{name:'Jewellery',price:800,seller:'Tech World',image:jewellery},
{name:'Cosmetics',price:800,seller:'Tech World',image:cosmetics},
{name:'Skincare',price:800,seller:'Tech World',image:skincare},
{name:'Bridal',price:800,seller:'Tech World',image:bridal},
{name:'Party',price:800,seller:'Tech World',image:party},

]

export default function Products(){

      const { t } = useTranslation();

return(
  
    

 <div className='max-w-7xl mx-auto'> 

<div  style={{
      justifyContent:"space-end",
      background:"#22666B",
      color:"white",
      display:"flex",
      padding:"15px"
    }}>
{/* <input
placeholder={t('searchProducts')}
className='border p-4 rounded-2xl w-96'
/> */}

{/* <select className='border p-4 rounded-2xl'>
<option>All Categories</option>
</select> */}
</div>

{/* <div className='grid md:grid-cols-3 gap-10'>
{products.map(p=><ProductCard product={p}/>)}
</div> */}
 <CategoriesBar />
<CardsSection/>

 </div> 
// </>
)
}