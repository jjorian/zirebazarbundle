import Product from '../models/product';

const PRODUCTS = [
  new Product(
    'p1',
    'u1',
    'پیرهن قرمز',
    'http://parsianandroid.ir/Downloads/Content/Image/ShopImage//tshirt.jpg',
    'تیشرت قرمز مناسب برای روزهای با اب  هوای غیر قرمز',
    345000
  ),
  new Product(
    'p2',
    'u1',
    'بافت آبی',
    'http://parsianandroid.ir/Downloads/Content/Image/ShopImage/pattern.jpg',
    'فیت شده با تیشرت قرمز برای پوشیدن بر روی آن',
    260000
  ),
  new Product(
    'p3',
    'u2',
    'ماگ قهوه',
    'http://parsianandroid.ir/Downloads/Content/Image/ShopImage/coffee.jpg',
    'می تواند برای چای نیز استفاده شود',
    85000
  ),
  new Product(
    'p4',
    'u3',
    'کتاب -ویرایش محدود',
    'http://parsianandroid.ir/Downloads/Content/Image/ShopImage/book.jpg',
    "محتوای آن چیست؟ چرا این مهم است؟ این یک نسخه محدود است!",
    196000
  ),
  new Product(
    'p5',
    'u3',
    'لپ تاپ قدرتی',
    'http://parsianandroid.ir/Downloads/Content/Image/ShopImage/laptop.jpg',
    'سخت افزار بسیار جذاب ، صفحه کلید تند و سریع و قیمت سنگین. قبل از انتشار مورد جدید ، اکنون بخرید!',
    65000000
  ),
  new Product(
    'p6',
    'u1',
    'قلم و کاغذ',
    'http://parsianandroid.ir/Downloads/Content/Image/ShopImage/pen.jpg',
    "می تواند برای نقش آفرینی استفاده شود (نه نوع نقش آفرینی که به آن فکر می کنید ...).",
    125000
  )
];

export default PRODUCTS;
