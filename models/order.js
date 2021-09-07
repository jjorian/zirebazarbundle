export class OrderHeadView {
  constructor(
    ID,
    UserId,
    ShopId,
    AddressId,
    CDateTime,
    ShopTitle,
    Status,
    UserFUllName,
    StatusTitle,
    Sum,
    AccCode,
    PayMethod,
    Details,
    OrderRows,
    Address
  ) {
    this.ID = ID;
    this.UserId = UserId;
    this.ShopId = ShopId;
    this.AddressId = AddressId;
    this.CDateTime = CDateTime;
    this.ShopTitle = ShopTitle;
    this.Status = Status;
    this.UserFUllName = UserFUllName;
    this.StatusTitle = StatusTitle;
    this.Sum = Sum;
    this.AccCode = AccCode;
    this.PayMethod = PayMethod;
    this.Details = Details;

    this.OrderRows = OrderRows;
    this.Address = Address;
  }
  static fromJson(json) {
    let a = new OrderHeadView();
    a.ID = json.ID;
    a.UserId = json.UserId;
    a.ShopId = json.ShopId;
    a.AddressId = json.AddressId;
    a.CDateTime = json.CDateTime;
    a.ShopTitle = json.ShopTitle;
    a.Status = json.Status;
    a.UserFUllName = json.UserFUllName;
    a.StatusTitle = json.StatusTitle;
    a.Sum = json.Sum;
    a.AccCode = json.AccCode;
    a.PayMethod = json.PayMethod;
    a.Details = json.Details;
    a.OrderRows = json.OrderRows;
    return a;
  }
}
//export default ShopListView;
export class OrderRowView {
  constructor(
    ID,
    HId,
    PId,
    Title,
    Price,
    Discount,
    Count,
    Comment
  ) {
    this.ID = ID;
    this.HId = HId;
    this.PId = PId;
    this.Title = Title;
    this.Price = Price;
    this.Discount = Discount;
    this.Count = Count;
    this.Comment = Comment;
  }
}

