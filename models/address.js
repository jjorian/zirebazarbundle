export class AddressView {
  ID
  UserId
  StateId
  CityId
  Status
  Details
  Recivier
  Mobile
  Tel
  PostalCode
  LatLang
  LocateTitle
  FullName
  constructor(ID,
    UserId,
    StateId,
    CityId,
    Status,
    Details,
    Recivier,
    Mobile,
    Tel,
    PostalCode,
    LatLang,
    LocateTitle,
    FullName) {
    this.ID = ID;
    this.UserId = UserId;
    this.StateId = StateId;
    this.CityId = CityId;
    this.Status = Status;
    this.Details = Details;
    this.Recivier = Recivier;
    this.Mobile = Mobile;
    this.Tel = Tel;
    this.PostalCode = PostalCode;
    this.LatLang = LatLang;
    this.LocateTitle = LocateTitle;
    this.FullName = FullName;
  }
}
