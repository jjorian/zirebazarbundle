export class ProductListView {
  constructor(ID,
    ShopId,
    Code,
    Name,
    CategoryId,
    Price1,
    Price2,
    Price3,
    Price4,
    Price5,
    Discount,
    Brand,
    Inventory,
    Status,
    Active,
    StatusTitle,
    ActiveTitle,
    CategoryTitle,
    Barcode,
    AccCode,
    Media) {
    this.ID = ID;
    this.ShopId = ShopId;
    this.Code = Code;
    this.Name = Name;
    this.CategoryId = CategoryId;
    this.Price1 = Price1;
    this.Price2 = Price2;
    this.Price3 = Price3;
    this.Price4 = Price4;
    this.Price5 = Price5;
    this.Discount = Discount;
    this.Brand = Brand;
    this.Inventory = Inventory;
    this.Status = Status;
    this.Active = Active;
    this.StatusTitle = StatusTitle;
    this.ActiveTitle = ActiveTitle;
    this.CategoryTitle = CategoryTitle;
    this.Barcode = Barcode;
    this.AccCode = AccCode;
    this.Media = Media;

  }



}
export class ProductOrderItem {

  constructor(ID,
    Name,
    ShopId,
    Price1,
    Discount) {
    this.ID = ID;
    this.Name = Name;
    this.ShopId = ShopId;
    this.Price1 = Price1;
    this.Discount = Discount;

  }


}
