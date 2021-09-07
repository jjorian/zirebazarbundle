import { gql } from '@apollo/client';
////////////////QUERIE'S
export const FETCH_USER_INFO = gql`query($ID:ID,$UserName:String,$Password:String,$HashCode:String,$Mobile:String,$Email:String,$SessionID:ID) 
{
  user(userLogin:{ID:$ID,UserName:$UserName,Password:$Password,HashCode:$HashCode,Mobile:$Mobile,Email:$Email,SessionID: $SessionID}) {
    ID
    FullName
    UserName
    Password
    HashCode
    Mobile
    Email
    BirthDay
    RegisterDate
    Active
    Status
    StatusTitle
    ActiveTitle
    GenderTitle
    Role
    StateId
    CityId
    LocateTitle
    Gender
    IsOnline
    PAID
    NationalCode
    Code
    ProfileScore
    GoogleToken
    Medias {
      ID
      URL
      Title
      KeyID
      KeyType
      Status
      Type
    }
  }
} 
`;
export const FETCH_SHOP_PRODUCTS = gql`query($sid: ID,$catId: ID,$query: String,$pageSize: Int!, $offset: Int!) 
{
  productList(sid:$sid,catId:$catId,query:$query, limit: $pageSize, offset: $offset)
  {
    ID
    Name
    Code
    ShopId
    CategoryId
    Price1
    Price2
    Price3
    Price4
    Price5
    Barcode
    Discount
    Brand
    Inventory
    Status
    Active
    StatusTitle
    ActiveTitle
    CategoryTitle
    AccCode
    Media {
      ID
      URL
      Title
      Type
      Status
      KeyType
      KeyID
    }
  }
} 
`;
export const FETCH_LOCATE = gql`query($id: ID,$level: Int,$parent: Int) 
{   
    locate(id:$id,level:$level,parent:$parent) {
      ID
      Name  
      lvl
      Parent
      Summery
    }  
} 
`;
export const FETCH_SHOP_CATEGORY = gql`query($group: Short, $parent: ID, $query: String, $sid: ID) 
{
  categoryList(group:$group, parent:$parent, query: $query, sid: $sid)
  {
    ID
    Group
    Title
    Active
    MediaId
    ShopId
    ParentId
    ChieldCount
    ProductCount
    AccCode
    Media {
      ID
      URL
      Title
      KeyID
      KeyType
      Type
    }
  }
} 
`;
export const FETCH_SHOP_ORDER_HEAD = gql`query($hid: ID,$uid: ID,$sid: ID,$status: Short) 
{
  orderHead(hid:$hid,uid:$uid,sid:$sid,status:$status) {
    ID
	  UserId
	  ShopId
	  AddressId
	  CDateTime
	  ShopTitle
	  Status
	  UserFullName
	  StatusTitle
	  Sum
	  AccCode
    Details
    PayMethod
    Address
    {
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

    }
    OrderRows {
      ID
      HId
      PId
      Title
      Price
      Discount
      Count
      Comment
    }
  }
} 
`;
export const FETCH_SHOP_ORDER_HEAD_LIST = gql`query($uid: ID,$sid: ID,$type: Short,$status: Short) 
{
  orderHeadList( uid:$uid,sid:$sid,type:$type,status:$status) {
    ID
    UserId
    ShopId
    AddressId
    CDateTime
    ShopTitle
    Status
    UserFullName
    StatusTitle
    Sum
    AccCode
    PayMethod
  }
} 
`;
export const FETCH_ADDRESS = gql`query($aid: ID) 
{
  address( aid:$uid) {
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
  }
} 
`;
export const FETCH_ADDRESS_LIST = gql`query($uid: ID) 
{
  addressList( uid:$uid) {
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
  }
} 
`;
export const FETCH_LOCATE_LIST = gql`query($id: ID,$level: Int,$parent: Int) 
{
  locate(id:$id, level: $level, parent: $parent) {
    ID
    Title:Name
  }
} 
`;
export const FETCH_SHOP = gql`query($sid: ID,$shopCode: String, $shopName: String) 
{
  shop(sid:$sid,shopCode: $shopCode, shopName: $shopName)
  {    
    ID
    FullName
    Name
    Code
    Title
    Status
    Active
    CategoryId
    RegisterDate
    Avatar
    ActiveTitle
    StatusTitle
    LocateTitle
    GeoLocation
    CategoryTitle
    MemberStatus
    Tel
    Site
    Address
    Description
    Logo
    CityId
    Policy
    StateId
    Medias {
      ID
      KeyID
      KeyType
      Status
      Title
      Type
      URL
    }
    Settings {
      ID
      TCode
      Title
      Type
      KeyId
      DefaultBValue
      DefaultIValue
      DefaultTValue
      BValue
      IValue
      TValue
    }
  }
} 
`;
export const FETCH_PRODUCT = gql`query product($pid:ID,$productName:String,$productCode:String) 
{
  Response:product(pid:$pid,productCode:$productCode,productName:$productName) {
    ID
    ShopId
    Code
    Name
    LatinName
    CategoryId
    DateCreate
    UnitMain
    UnitSub
    Price1
    Price2
    Price3
    Price4
    Price5
    Equal
    Barcode
    Discount
    Des
    Features
    Brand
    Country
    AccCode
    Inventory
    Status
    Active
    StatusTitle
    ActiveTitle
    CategoryTitle
    Medias {
      ID
      KeyID
      KeyType
      Status
      Title
      Type
      URL
    }
  }
  
}
`;
export const FETCH_SHOPS = gql`query($userId: ID) 
  {
    shopList(uid:$userId,type:1)
     {
      ID
    FullName
    Name
    Code
    Title
    Status
    Active
    CategoryId
    CartsCount
    RegisterDate
    Avatar
    ActiveTitle
    StatusTitle
    LocateTitle
    CategoryTitle
    MemberStatus
    Media {
      ID
      KeyID
      KeyType
      Status
      Title
      Type
      URL
    }
     }
   }
 
`;
export const FIND_SHOPS = gql`query($query: String) 
  {
    findShop(query:$query)
     {
       ID,
       Name,      
       Arg1,
       Arg2,
       Arg3
     }
   }
 
`;
export const FIND_PRODUCTS = gql`query($sid: ID,$query: String) 
  {
    findProduct(sid:$sid,query:$query)
     {
       ID,
       Name,      
       Arg1,
       Arg2,
       Arg3
     }
   }
 
`;

///////MUTATION'S

export const ADD_EDIT_ORDER_ROW = gql`mutation addEditOrderRow($sid: ID!,$uid:ID!,$status:Short!,$addEditItem:OrderRowInput!) 
{
  addEditOrderRow(sid:$sid,uid:$uid,status:$status,addEditItem:$addEditItem)
  {
    Comment 
Count 
Discount 
HId 
ID 
PId 
Price 
Title 
  }
} 
`;
export const ADD_EDIT_ORDER_HEAD = gql`mutation addEditOrderHead($addEditItem:OrderHeadInput!) 
{
  addEditOrderHead(addEditItem:$addEditItem) {   
    ID
    UserId
    ShopId
    AddressId
    CDateTime
    ShopTitle
    Status
    UserFullName
    StatusTitle
    Sum
    AccCode
    PayMethod
  }
} 
`;
export const ADD_EDIT_ADDRESS = gql`mutation addEditAddress($inputAddress: AddressInput) 
{
  addEditAddress(inputAddress:$inputAddress)
  {
    ID
  }
} 
`;
export const EDIT_USER_INFO = gql`mutation editUser($InputUser:UserEditInput) 
{
  editUser(InputUser:$InputUser)
  {
    ID
    ProfileScore
    FullName
  }
} 
`;
export const MEMBER_TO_SHOP = gql`mutation memberToShop($ID:ID,$ShopId:ID, $UserId:ID, $MemberStatus:Short,$AccCode:String,$GroupId:ID) 
{
  memberToShop(member:{ID:$ID,ShopId:$ShopId,UserId:$UserId,MemberStatus:$MemberStatus,AccCode:$AccCode,GroupId:$GroupId})
    
} 
`;
