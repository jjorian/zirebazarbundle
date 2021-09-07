export class UserLoginView {
  constructor(ID, UserName, Password, HashCode, Mobile, Email) {
    this.ID = ID;
    this.HashCode = HashCode;
    this.UserName = UserName;
    this.Password = Password;
    this.Mobile = Mobile;
    this.Email = Email;
  }
}
export class UserView {

  constructor(
    ID,
    FullName,
    UserName,
    Password,
    HashCode,
    Mobile,
    Email,
    BirthDay,
    RegisterDate,
    Active,
    Status,
    StatusTitle,
    ActiveTitle,
    GenderTitle,
    Role,
    StateId,
    CityId,
    LocateTitle,
    Gender,
    IsOnline,
    PAID,
    NationalCode,
    Code,
    ProfileScore,
    GoogleToken,
    Medias) {
    this.ID = ID;
    this.UserName = UserName;
    this.FullName = FullName;
    this.Password = Password;
    this.HashCode = HashCode;
    this.Mobile = Mobile;
    this.Email = Email;
    this.BirthDay = BirthDay;
    this.RegisterDate = RegisterDate;
    this.Active = Active;
    this.Status = Status;
    this.Role = Role;
    this.StateId = StateId;
    this.CityId = CityId;
    this.Gender = Gender;
    this.StatusTitle = StatusTitle;
    this.ActiveTitle = ActiveTitle;
    this.GenderTitle = GenderTitle;
    this.ProfileScore = ProfileScore;
    this.IsOnline = IsOnline;
    this.PAID = PAID;
    this.LocateTitle = LocateTitle;
    this.NationalCode = NationalCode;
    this.Code = Code;
    this.GoogleToken = GoogleToken;
    this.Medias = Medias;
  }
}
