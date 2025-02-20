# define class Cookie for later use
class Cookie:
    def __init__(self, id, name, price, qty, img):
        self.id = id
        self.name = name
        self.price = price
        self.qty = qty
        self.img = img
        self._total = self.price * self.qty

    # for debugging
    def __str__(self):
        return f"<Name:{self.name}|ID:{self.id}|Price:{self.price}|Qty:{self.qty}|Total:{self._total}|ImgSrc:\"{self.img}\">"

    # add serialising method for jsonify by turning object into dict
    # using list comprehension in jsonify
    # usage: return jsonify[c.serialise() for c in session["cart"]]
    def serialise(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "qty": self.qty,
            "total": self._total,
            "img": self.img,
        }
    
    def update_total(self):
        self._total = self.price * self.qty

    # getter for id
    @property
    def id(self):
        return self._id

    # setter for id
    @id.setter
    def id(self, id):
        if not id:
            raise ValueError("Invalid id")
        self._id = int(id)

    # getter for name
    @property
    def name(self):
        return self._name

    # setter for name
    @name.setter
    def name(self, name):
        if not name:
            raise ValueError("Invalid name")
        self._name = name

    # getter for price
    @property
    def price(self):
        return self._price

    # setter for price
    @price.setter
    def price(self, price):
        if not price:
            raise ValueError("Invalid price")
        self._price = float(price)

    # getter for qty
    @property
    def qty(self):
        return self._qty

    # setter for qty
    @qty.setter
    def qty(self, qty):
        if not qty:
            raise ValueError("Invalid qty")
        self._qty = int(qty)

    # getter for img
    @property
    def img(self):
        return self._img

    # setter for img
    @img.setter
    def img(self, img):
        if not img:
            raise ValueError("Invalid img")
        self._img = img
