# Swift Overview

[[toc]]

## Swift Programming Language

Paul Hegarty begins with a demonstration of making Concentration's button layout dynamic. He then reviews the first two lectures and continues diving into Swift.

Topics Include: Swift, Autolayout, CountableRange, Tuples, Computer Properties, Access Control, Assertions, Extensions, enum, Optionals, Data Structure, Protocols

Note: English subtitles are available within the video: enable English CC subtitles.

### ✅ Watch the third lecture video.

[Lecture 3: Swift Programming Language](https://youtu.be/ZbpjTPzf8x4?list=PLPA-ayBrweUzGFmkT_W65z64MoGnKRZMq)

<video width="100%" controls preload>
  <source src="https://applehosted.podcasts.apple.com/stanford/media/3_Swift_Programming_Language_319-2557083044702627203-03_10_02_17_prores_CS193p_1080p_3mb_cc.m4v" />
</video>

### ✅ Review Lecture 3 Slides.

[Lecture 3 Slides](https://github.com/chuxubank/Learning-iOS/blob/master/Developing-iOS-11-Apps-with-Swift/L3-Swift-Overview/Lecture-3-Slides.pdf)

#### Autolayout teaser

Making Concentration’s button layout dynamic:

We want our UI to work on different iPhones and in both landscape and portrait We’ll do this using UIStackView and autolayout
This is only a taste of what’s to come on this front in a couple of weeks

#### Quick review of what we learned in Concentration

Brief Review of Week 1:

- Target/Action and Outlets and Outlet Collections
- Methods and Properties (aka instance variables)
- Property Observer (`didSet`)
- `Array<Element>`
- MVC
- Value types (`struct`) versus reference types (`class`)
- `init`ializers
- Type (`static`) methods
- `lazy` properties
- `for in` loops
- `Dictionary<Key,Value>`
- Type conversion (e.g. `UInt32(anInt)`)
- And, of course, Optionals, which we’re going to revisit in more detail a bit later in this lecture

#### `CountableRange` of floating point numbers

Floating point CountableRange:

How do you do `for (i = 0.5; i <= 15.25; i += 0.3)`?

Floating point numbers don’t stride by Int, they stride by a floating point value.

So `0.5...15.25` is just a Range, not a CountableRange (which is needed for `for in`).

Luckily, there’s a global function that will create a CountableRange from floating point values!

``` swift
for i in stride(from: 0.5, through: 15.25, by: 0.3) {

}
```

The return type of stride is `CountableRange` (actually `ClosedCountableRange` in this case because it’s `through:` instead of `to:`).

As we’ll see with String later, CountableRange is a generic type (doesn’t have to be Ints).

#### Tuples
**What is a tuple?**

It is nothing more than a grouping of values. You can use it anywhere you can use a type.

``` swift
let x: (String, Int, Double) = (“hello”, 5, 0.85) // the type of x is “a tuple”
let (word, number, value) = x // this names the tuple elements when accessing the tuple print(word) // prints hello
print(number) // prints 5
print(value) // prints 0.85
```

... or the tuple elements can be named when the tuple is `declared` (this is strongly preferred) ...

``` swift
let x: (w: String, i: Int, v: Double) = (“hello”, 5, 0.85)
print(x.w) // prints hello
print(x.i) // prints 5
print(x.v) // prints 0.85
let (wrd, num, val) = x // this is also legal (renames the tuple’s elements on access)
```
**Tuples as return values**

You can use tuples to return multiple values from a function or method ...

``` swift
func getSize() -> (weight: Double, height: Double) { return (250, 80) }
let x = getSize()
print(“weight is \(x.weight)”) // weight is 250
... or ...
print(“height is \(getSize().height)”) // height is 80
```
#### Computed Properties

**The value of a property can be computed rather than stored**

A typical stored property looks something like this ...
``` swift
var foo: Double
```
A computed property looks like this ...
``` swift
var foo: Double {
	get {
	// return the calculated value of foo
	}
	set(newValue) {
	// do something based on the fact that foo has changed to newValue
	}
}
```
You don’t have to implement the set side of it if you don’t want to. The property then becomes “read only”.


::: tip
If you have a read only property, you do not actually have to have the word `get` there.

``` swift
var numberOfPairsOfCards: Int {
	return (cardButtons.count + 1) / 2
}
```
:::

**Why compute the value of a property?**

Lots of times a “property” is “derived” from other state.

For example, in Concentration, we can derive this var easily from looking at the cards ...
``` swift
var indexOfOneAndOnlyFaceUpCard: Int?
```
In fact, properly keeping this var up-to-date is just plain error-prone. This would be safer ...
``` swift
var indexOfOneAndOnlyFaceUpCard: Int? {
	get {
	// look at all the cards and see if you find only one that’s face up
	// if so, return it, else return nil
	}
	set {
	// turn all the cards face down except the card at index newValue
	}
}
```
Let’s go to Concentration and make this change ...

**Make `indexOfOneAndOnlyFaceUpCard` be computed**

That way it will always be in sync

And we’ll see that the rest of our code gets even simpler because of it

#### Access Control

**Protecting our internal implementations**

Likely most of you have only worked on relatively small projects

Inside those projects, any object can pretty much call any function in any other object When projects start to get large, though, this becomes very dicey

You want to be able to protect the INTERNAL implementation of data structures

You do this by marking which API[^API] you want other code to use with certain keywords

[^API]:i.e. methods and properties

Swift supports this with the following access control keywords ...
- `internal` - this is the default, it means “usable by any object in my app or framework” 
- `private` - this means “only callable from within this object”
- `private(set)` - this means “this property is readable outside this object, but not settable”
- `fileprivate` - accessible by any code in this source file
- `public` - (for frameworks only) this can be used by objects outside my framework
- `open` - (for frameworks only) public and objects outside my framework can subclass this

We are not going to learn to develop frameworks this quarter, so we are only concerned with ... private, private(set), fileprivate and internal (which is the default, so no keyword)

A good strategy is to just mark everything private by default.  Then remove the private designation when that API is ready to be used by other code.

Concentration needs some access control ...

**Add access control to Concentration**

Even though our app is small, we want to learn to develop like we’re on a big team Also, let’s protect our API with assertions too

#### `assertions`

An `assertion` is just a function that you call where you assert something to be true.  And if it's not your program crashes and print out an error.

And you put it in your code, the asserts are ignored when you ship to the App Store. But when you're in development, it'll be crashing your program, which is good, cuz it takes the debugger right to the assertion failed.

And asserts are a great way to protect your API.

``` swift
func chooseCard(at index: Int) {
	assert(cards.indices.contains(index), "Concentration.chooseCard(at: \(index)) : Choosen index out of range")
	...
}
```

#### `extensions`

- Extending existing data structures
  
  You can add methods/properties to a class/struct/enum (even if you don’t have the source).

- There are some restrictions
  
  You can’t re-implement methods or properties that are already there (only add new ones). The properties you add can have **no storage** associated with them (computed only).

- This feature is easily abused
  
  It should be used to add clarity to readability not obfuscation!
  
  Don’t use it as a substitute for good object-oriented design technique.

  Best used (at least for beginners) for very small, well-contained helper functions. Can actually be used well to organize code but requires architectural commitment. When in doubt (for now), don’t do it.

Let’s add a simple `extension` in Concentration ...

Make `arc4random` code a lot cleaner

In your homework you are using it at least twice

And it’s easy to imagine using it even more often in Concentration and beyond

``` swift
extension Int {
	var arc4Random: Int {
	switch self {
	case 1...Int.max:
	return Int(arc4random_uniform(UInt32(self)))
	case -Int.max..<0:
	return Int(arc4random_uniform(UInt32(self)))
	default:
	return 0
	}
	}
}
```

#### `enum`

**Another variety of data structure in addition to `struct` and `class`**

It can only have discrete states ...

``` swift
enum FastFoodMenuItem {
	case hamburger
	case fries
	case drink
	case cookie
}
```

An enum is a VALUE TYPE (like struct), so it is copied as it is passed around

**Associated Data**

Each state can (but does not have to) have its own “associated data” ...

``` swift
enum FastFoodMenuItem {
	case hamburger(numberOfPatties: Int)
	case fries(size: FryOrderSize)
	case drink(String, ounces: Int) // the unnamed String is the brand, e.g. “Coke”
	case cookie
}
```

Note that the drink case has 2 pieces of associated data (one of them “unnamed”) In the example above, FryOrderSize would also probably be an enum, for example ...

``` swift
enum FryOrderSize {
	case large
	case small
}
```

**Setting the value of an `enum`**

Assigning a value to a variable or constant of type enum is easy ...

``` swift
let menuItem: FastFoodMenuItem =
var otherItem: FastFoodMenuItem =
```

Just use the name of the type along with the case you want, separated by dot ...

When you set the value of an enum you must provide the associated data (if any) ...

``` swift
let menuItem: FastFoodMenuItem = FastFoodMenuItem.hamburger(patties: 2)
var otherItem: FastFoodMenuItem = FastFoodMenuItem.cookie
```

Swift can infer the type on one side of the assignment or the other (but not both) ...
``` swift
let menuItem = FastFoodMenuItem.hamburger(patties: 2)
var otherItem: FastFoodMenuItem = .cookie
var yetAnotherItem = .cookie // Swift can’t figure this out
```

**Checking an enum’s state**

An enum’s state is checked with a switch statement ...
``` swift
  var menuItem = FastFoodMenuItem.hamburger(patties: 2)
  switch menuItem {
	  case FastFoodMenuItem.hamburger: print(“burger”)
	  case FastFoodMenuItem.fries: print(“fries”)
	  case FastFoodMenuItem.drink: print(“drink”)
	  case FastFoodMenuItem.cookie: print(“cookie”)
}
```
Note that we are ignoring the “associated data” above ... so far ...

This code would print “burger” on the console

**`break`**

If you don’t want to do anything in a given case, use `break` ...
``` swift
var menuItem = FastFoodMenuItem.hamburger(patties: 2)
switch menuItem {
	case .hamburger: break
	case .fries: print(“fries”)
	case .drink: print(“drink”)
	case .cookie: print(“cookie”)
}
```
This code would print nothing on the console


**`default`**

You must handle ALL POSSIBLE CASES (although you can default uninteresting cases) ...
``` swift
var menuItem = FastFoodMenuItem.cookie
switch menuItem {
	case .hamburger: break
	case .fries: print(“fries”)
	default: print(“other”)
}
```

If the menuItem were a cookie, the above code would print “other” on the console

::: tip
You can switch any type in Swift, even switch on a `string`, of cause you are going to use `default` in a `string` case.
:::

**Multiple lines allowed**

Each case in a switch can be multiple lines and does NOT fall through to the next case ... (Very different from C/C++)

``` swift
var menuItem = FastFoodMenuItem.fries(size: FryOrderSize.large)
switch menuItem {
	case .hamburger: print(“burger”)
	case .fries:
	print(“yummy”)
	print(“fries”)
	case .drink:
	print(“drink”)
	case .cookie: print(“cookie”)
}
```
The above code would print “yummy” and “fries” on the console, but not “drink”

By the way, we can let Swift infer the enum type of the size of the fries too ...
``` swift
var menuItem = FastFoodMenuItem.fries(size: .large)
```

**What about the associated data?**

Associated data is accessed through a switch statement using this `let` syntax ...

``` swift
var menuItem = FastFoodMenuItem.drink(“Coke”, ounces: 32)
switch menuItem {
	case .hamburger(let pattyCount): print(“a burger with \(pattyCount) patties!”)
	case .fries(let size): print(“a \(size) order of fries!”)
	case .drink(let brand, let ounces): print(“a \(ounces)oz \(brand)”)
	case .cookie: print(“a cookie!”)
}
```

The above code would print “a 32oz Coke” on the console

Note that the local variable that retrieves the associated data can have a different name 
- (e.g. `pattyCount` above versus `patties` in the `enum` declaration)
- (e.g. `brand` above versus not even having a name in the enum declaration)

**Methods yes, (stored) Properties no**

An enum can have methods (and computed properties) but no stored properties ...

``` swift
enum FastFoodMenuItem {
	case hamburger(numberOfPatties: Int)
	case fries(size: FryOrderSize)
	case drink(String, ounces: Int)
	case cookie
	
	func isIncludedInSpecialOrder(number: Int) -> Bool { }
	var calories: Int { // calculate and return caloric value here }
}
```
An enum’s state is entirely which case it is in and that case’s associated data.


In an enum’s own methods, you can test the enum’s state (and get associated data) using self ...

``` swift
enum FastFoodMenuItem {
	...
	func isIncludedInSpecialOrder(number: Int) -> Bool {
		switch self {
			case .hamburger(let pattyCount): return pattyCount == number
			case .fries, .cookie: return true // a drink and cookie in every special order
			case .drink(_, let ounces): return ounces == 16 // & 16oz drink of any kind
		}
	}
}
```
Special order 1 is a single patty burger, 2 is a double patty (3 is a triple, etc.?!)

Notice the use of `_` if we don’t care about that piece of associated data.

**Modifying `self` in an enum**

You can even reassign self inside an enum method ...

``` swift
enum FastFoodMenuItem {
	...
	mutating func switchToBeingACookie() {
		self = .cookie // this works even if self is a .hamburger, .fries or .drink
	}
}
```

Note that mutating is required because enum is a VALUE TYPE.

#### Optionals are `enums`

It essentially looks like this ...

``` swift
enum Optional<T> { // a generic type, like Array<Element> or Dictionary<Key,Value>
	case none
	case some(<T>) // the some case has associated data of type T
}
```
But this type is so important that it has a lot of special syntax that other types don’t have ...

**Special Optional syntax in Swift**

The “not set” case has a special keyword: `nil`

- The character `?` is used to declare an Optional

  e.g. `var indexOfOneAndOnlyFaceUpCard: Int?`

- The character `!` is used to “unwrap” the associated data if an Optional is in the “set” state ...

  e.g. `let index = cardButtons.index(of: button)!`

- The keyword `if` can also be used to conditionally get the associated data ...

  e.g. `if let index = cardButtons.index(of: button) { ... }`

- An Optional declared with `!` (instead of ?) will implicitly unwrap (add !) when accessed ...

  e.g. `var flipCountIndex: UILabel!` enables `flipCountIndex.text = “...”` (i.e. no ! here)

- You can use `??` to create an expression which “defaults” to a value if an Optional is not set ...

  e.g. `return emoji[card.identifier] ?? “?”`

- You can also use `?` when accessing an Optional to bail out of an expression midstream ...

  this is called Optional Chaining, we’ll take a closer look at it in a few slides


``` swift
enum Optional<T> {
	case none
	case some(<T>)
}
```

Declaring and assigning values to an Optional ...

``` swift
var hello: String?
var hello: String? = “hello”
var hello: String? = nil

var hello: Optional<String> = .none
var hello: Optional<String> = .some(“hello”)
var hello: Optional<String> = .none
```

Note that Optionals always start out `nil` ...

``` swift
let hello: String? = ...
print(hello!)

switch hello {
	case .none: // raise an exception (crash)
	case .some(let data): print(data)
}
```

``` swift
if let greeting = hello {
	print(greeting)
} else {
	// do something else
}

switch hello {
	case .some(let data): print(data)
	case .none: { // do something else }
}
```

Implicitly unwrapped Optional (these start out `nil` too)...

``` swift
var hello: String!
hello = ...
print(hello)

var hello: Optional<String> = .none
switch hello {
	case .none: // raise exception (crash)
	case .some(let data): print(data)
}
```
Nil-coalescing operator (Optional defaulting) ...

``` swift
let x: String? = ...
let y = x ?? “foo”

switch x {
	case .none: y = “foo”
	case .some(let data): y = data
}
```

Optional chaining ...
``` swift
let x: String? = ...
let y = x?.foo()?.bar?.z

switch x {
	case .none: y = nil
	case .some(let data1):
 		switch data1.foo() {
			case .none: y = nil
			case .some(let data2):
				switch data2.bar {
					case .none: y = nil
					case .some(let data3): y = data3.z
				} 
		}
}
```

#### Data structure review (including memory management)
**Four Essential Data Structure-building Concepts in Swift**
- class
  - Supports object-oriented design
  - Single inheritance of both functionality and data (i.e. instance variables)
  - Reference type (classes are stored in the heap and are passed around via pointers)
  - Heap is automatically “kept clean” by Swift (via reference counting, not garbage collection) Examples: ViewController, UIButton, Concentration

- struct
  - Value type (structs don’t live in the heap and are passed around by copying them) Very efficient “copy on write” is automatic in Swift
  - This copy on write behavior requires you to mark mutating methods
  - No inheritance (of data)
  - Mutability controlled via let (e.g. you can’t add elements to an Array assigned by let) Supports functional programming design
  - Examples: Card, Array, Dictionary, String, Character, Int, Double, UInt32
  
  Let’s jump over to Concentration and see what happens if we make Concentration a struct ...

  **Make Concentration into a struct**
  
  We’ll see that there’s little difference in how it’s declared
- enum
  - Used for variables that have one of a discrete set of values
  - Each option for that discrete value can have “associated data” with it
  - The associated data is the only storage that an enum can have (no instance variables) Value type (i.e. passed around by copying)
  - Can have methods and computed (only) properties
  - Example: we’ll create a PlayingCard struct that uses Rank and Suit enums
- protocol
  - A type which is a declaration of functionality only
  - No data storage of any kind (so it doesn’t make sense to say it’s a “value” or “reference” type) 
  - Essentially provides multiple inheritance (of functionality only, not storage) in Swift
  - We’ll “ease into” learning about protocols since it’s new to most of you
  - Let’s dive a little deeper into protocols ...

#### Memory Management

**Automatic Reference Counting**

Reference types (classes) are stored in the heap.
How does the system know when to reclaim the memory for these from the heap?

It “counts references” to each of them and when there are zero references, they get tossed.

This is done automatically.

It is known as “Automatic Reference Counting” and it is NOT garbage collection.

**Influencing ARC**

You can influence ARC by how you declare a reference-type var with these keywords ...

- `strong`
  - strong is “normal” reference counting
  - As long as anyone, anywhere has a strong pointer to an instance, it will stay in the heap
  - Default so never use (Also not keywords)
- `weak`
  - outlets `@IBOutlet` (UI related) / delegation (MVC)
  - weak means “if no one else is interested in this, then neither am I, set me to nil in that case”
  - Because it has to be nil-able, weak only applies to Optional pointers to reference types
  - A weak pointer will NEVER keep an object in the heap
  - Great example: outlets (strongly held by the view hierarchy, so outlets can be weak)
- `unowned`
  - unowned means “don’t reference count this; crash if I’m wrong”
  - This is very rarely used
  - Usually only to break memory cycles between objects (more on that in a little while)

#### protocols (time permitting)

### ✅ Complete the second reading.

[Reading 2: Intro to Swift](https://github.com/chuxubank/Learning-iOS/blob/master/Developing-iOS-11-Apps-with-Swift/L3-Swift-Overview/Reading-2-Intro-to-Swift.pdf)

## More Swift

Paul Hegarty continues his coverage of Swift. 

Topics Include: Data Structures, Struct, Protocol, Enum, Delegation, Extension, String, Character, NSAttributedString, Function Types, Closures 

Note: English subtitles are available within the video: enable English CC subtitles.

### ✅ Watch the fourth lecture video.

[Lecture 4: More Swift](https://youtu.be/FU2V0YRQIOw?list=PLPA-ayBrweUzGFmkT_W65z64MoGnKRZMq)

<video width="100%" controls preload>
    <source src="https://applehosted.podcasts.apple.com/stanford/media/4_More_Swift_336-3848977901446740876-04_10_04_17_CS193p_1080p_3mb_cc.m4v" />
</video> 

### ✅ Review Lecture 4 Slides.

[Lecture 4 Slides](https://github.com/chuxubank/Learning-iOS/blob/master/Developing-iOS-11-Apps-with-Swift/L3-Swift-Overview/Lecture-4-Slides.pdf)

#### Quick demo of mutating

It's only funcs that we have to put that on.

`struct` is a `value type` that copy on writes stuff, that's why we care that it's mutating.

`class` is `reference type` that class just lives once in the heap, and you're passing pointers to it around.

#### protocols

**Protocols are a way to express an API more concisely**

Instead of forcing the caller of an API to pass a specific class, struct, or enum,
an API can let callers pass any class/struct/enum that the caller wants
but can require that they implement certain methods and/or properties that the API wants.

The API expresses the functions or variables it wants the caller to provide using a protocol. So a protocol is simply a collection of method and property declarations.


**What are `protocol`s good for?**

- Making API more flexible and expressive
- Blind, structured communication between View and Controller (delegation)
- Mandating behavior (e.g. the keys of a Dictionary must be hashable)
- Sharing functionality in disparate types (String, Array, CountableRange are all Collections) Multiple inheritance (of functionality, not data)

**A protocol is a TYPE**

It can be used almost anywhere any other type is used: vars, function parameters, etc.

**There are three aspects to a protocol**

1. the protocol declaration (which properties and methods are in the protocol)
2. a class, struct or enum declaration that makes the claim to implement the protocol
3. the code in said class, struct or enum (or extension) that implements the protocol

**Optional methods in a protocol**
Normally any protocol implementor must implement all the methods/properties in the protocol. 

However, it is possible to mark some methods in a protocol `optional` (don’t get confused with the type Optional, this is a different thing).

Any protocol that has optional methods must be marked `@objc`.

And any class that implements an optional protocol must inherit from `NSObject`. 

These sorts of `protocol`s are used often in iOS for `delegation` (more later on this). 

Except for delegation, a `protocol` with `optional` methods is rarely (if ever) used.

As you can tell from the `@objc` designation, it’s mostly for backwards compatibility.

**Declaration of the protocol itself**

``` swift
protocol SomeProtocol : InheritedProtocol1, InheritedProtocol2 {
	var someProperty: Int { get set }
	func aMethod(arg1: Double, anotherArgument: String) -> SomeType
	mutating func changeIt()
	init(arg: Type)
}
```
Anyone that implements SomeProtocol must also implement InheritedProtocol1 and 2

You must specify whether a property is get only or both `get` and `set`

Any functions that are expected to mutate the receiver should be marked `mutating` (unless you are going to restrict your protocol to class implementers only with `class` keyword) (rarely)
``` swift
protocol SomeProtocol : class, InheritedProtocol1, InheritedProtocol2 { ... }
```

You can even specify that implementers must implement a given `init`ializer

**How an implementer says “I implement that protocol”**

``` swift
class SomeClass : SuperclassOfSomeClass, SomeProtocol, AnotherProtocol {
	// implementation of SomeClass here
	// which must include all the properties and methods in SomeProtocol & AnotherProtocol
	required init(...)
}
```
Claims of conformance to protocols are listed after the superclass for a class (obviously, `enum`s and `struct`s would not have the superclass part)


Any number of protocols can be implemented by a given class, struct or enum

In a class, `init`s must be marked `required` (or otherwise a subclass might not conform)

You are allowed to add `protocol` conformance via an `extension`

``` swift
extension Something : SomeProtocol {
	// implementation of SomeProtocol here
	// no stored properties though
}
```


**Using protocols like the type that they are!**

``` swift
protocol Moveable {
	mutating func move(to point: CGPoint)
}
class Car : Moveable {
	func move(to point: CGPoint) { ... }
	func changeOil()
}
struct Shape : Moveable {
	mutating func move(to point: CGPoint) { ... }
	func draw()
}

let prius: Car = Car()
let square: Shape = Shape()

var thingToMove: Moveable = prius
thingToMove.move(to: ...)
thingToMove.changeOil()	// error: thingToMove is only Moveable.
thingToMove = square
let thingsToMove: [Moveable] = [prius, square]

func slide(slider: Moveable) {
	let positionToSlideTo = ...
	slider.move(to: positionToSlideTo)
}
slide(prius)
slide(square)

func slipAndSlide(x: Slippery & Moveable)
slipAndSlide(prius)	// error: prius is not Slippery
```

#### Delegation

- A very important (simple) use of `protocol`s

  It’s a way to implement “blind communication” between a View and its Controller

- How it plays out ...

  1. A View declares a delegation protocol (i.e. what the View wants the Controller to do for it) 
  2. The View’s API has a weak delegate property whose type is that delegation   protocol
  3. The View uses the delegate property to get/do things it can’t own or control on its own 
  4. The Controller declares that it implements the protocol
  5. The Controller sets delegate of the View to itself using the property in #2   above
  6. The Controller implements the protocol (probably it has lots of optional methods in it)

- Now the View is hooked up to the Controller

  But the View still has no idea what the Controller is, so the View remains generic/reusable

- This mechanism is found throughout iOS
  However, it was designed pre-closures in Swift. Closures are sometimes a better option. We’ll learn about closures soon.

**Example**

UIScrollView (which we’ll talk about next week) has a delegate property ...

`weak var delegate: UIScrollViewDelegate?`

The UIScrollViewDelegate protocol looks like this ...
``` swift
@objc protocol UIScrollViewDelegate {
	optional func scrollViewDidScroll(scrollView: UIScrollView)
	optional func viewForZooming(in scrollView: UIScrollView) -> UIView
	... and many more ...
}
```
A Controller with a UIScrollView in its View would be declared like this ...

`class MyViewController : UIViewController, UIScrollViewDelegate { ... }`

... probably in the `@IBOutlet didSet` for the scroll view, the Controller would do ...

`scrollView.delegate = self`

... and the Controller then would implement any of the protocol’s methods it is interested in.

#### Another use of Protocols

**Being a key in a Dictionary**

To be a key in a Dictionary, you have to be able to be unique.
A key in a Dictionary does this by providing an Int that is very probably unique (a hash) and then also by implementing equality testing to see if two keys are, in fact, the same.

This is enforced by requiring that a Dictionary’s keys implement the `Hashable` protocol. Here’s what that protocol looks like ...
``` swift
protocol Hashable: Equatable {
	var hashValue: Int { get }
}
```
Very simple. Note, though, that Hashable inherits from `Equatable` ...

That means that to be `Hashable`, you also have to implement `Equatable`. The Equatable protocol looks like this ...
``` swift
protocol Equatable {
	static func ==(lhs: Self, rhs: Self) -> Bool
}
```
Types that conform to Equatable have to have a type function (note the `static`) called == The arguments to == are both of that same type (i.e. Self of the type is the type itself)

The == operator also happens to look for such a static method to provide its implementation!

Dictionary is then declared like this: `Dictionary<Key: Hashable, Value>`

This restricts keys to be things that conform to Hashable (there’s no restriction on values)

Let’s go make Card be Hashable.

Then we can use it directly as the key into our emoji Dictionary.
As a bonus, we’ll be able to compare Cards directly since they’ll be Equatable.
This will even allow us to make identifier be private in Card, which makes a lot of sense.

**Demo: Make Card struct Hashable and Equatable**

Doing this allows us to make Card’s identifier private

It also lets us look up Cards directly in a Dictionary (rather than with its identifier)

And we can use == to compare Cards directly

And for your homework, supporting Equatable lets you use index(of:) on an Array of things

#### Advanced use of Protocols

- “Multiple inheritance” with protocols
  - `CountableRange` implements many protocols, but here are a couple of important ones ... 
  - `Sequence` — makeIterator (and thus supports `for in`)
  - `Collection` — subscripting (i.e. []), index(offsetBy:), index(of:), etc.

- Why do it this way?

  Because `Array`, for example, also implements these protocols.
  
  So now Apple can create generic code that operates on a Collection and it will work on both! 
  
  `Dictionary` is also a Collection, as is `Set` and `String`.

  And they don’t all just inherit the fact that they implement the methods in Collection, they actually inherit an implementation of many of the methods in Collection, because ...

- protocol & extension

  **Using extension to provide protocol implementation**

  We said that protocol implementation is provided by implementing types (struct, enum, class)
  
  However, an `extension` can be used to add default implementation to a protocol.
  
  Since there’s no storage, said implementation has to be in terms of other API in the protocol (and any API in any protocol that that protocol inherits from, of course).
  
  For example, for the Sequence protocol, you really only need to implement makeIterator. (An iterator implements the IteratorProtocol which just has the method next().)
  
  If you do, you will automatically get implementations for all these other methods in Sequence: `contains()`, `forEach()`, `joined(separator:)`, `min()`, `max()`, even `filter()` and `map()`, et. al. All of these are implemented via an extension to the Sequence protocol.
  
  This extension (provided by Apple) uses only Sequence protocol methods in its implementation. 
  ``` swift
  extension Sequence {
      func contains(_ element: Element) -> Bool { }
      // etc.
  }
  ```

- Functional Programming

  By combining protocols with generics and extensions (default implementations),you can build code that focusses more on the behavior of data structures than storage.
  
  This approach to development is called “functional programming.”

  It is different than “object-oriented programming” (it’s sort of an evolution thereof). 
  
  We don’t have time to teach functional programming, but you are getting a taste of it. 
  
  What’s great about Swift is that it supports both paradigms.

#### String

**The characters in a String**

A String is made up of Unicodes, but there’s also the concept of a `Character`.

A `Character` is what a human would perceive to be a single lexical character. 

This is true even if a single `Character` is made up of multiple Unicodes.

For example, there is a Unicode which is “apply an accent to the previous character”. 

But there is also a Unicode which is é (the letter e with an accent on it).

So the string café might be 4 Unicodes (c-a-f-é) or 5 Unicodes (c-a-f-e-’).

In either case, we preceive it as 4 `Character`s.

Because of this ambiguity, the index into a String cannot be an Int.

Is the p in “café pesto” at index 5 or index 6? Depends on the é.

Indices into Strings are therefore of a different type ... `String.Index`.

The simplest ways to get an index are `startIndex`, `endIndex` and `index(of:)`. 

There are other ways (see the documentation for more).

To move to another index, use `index(String.Index, offsetBy: Int)`.

``` swift
let pizzaJoint = “café pesto”
let firstCharacterIndex = pizzaJoint.startIndex // of type String.Index
let fourthCharacterIndex = pizzaJoint.index(firstCharacterIndex, offsetBy: 3)
let fourthCharacter = pizzaJoint[fourthCharacterIndex] // é

if let firstSpace = pizzaJoint.index(of: “ “) { // returns nil if “ ” not found
	let secondWordIndex = pizzaJoint.index(firstSpace, offsetBy: 1)
	let secondWord = pizzaJoint[secondWordIndex..<pizzaJoint.endIndex]
}
```

Note the `..<` above.

This is a `Range` of `String.Index`.

Range is a generic type (like Array is). It doesn’t have to be a range of Ints.

Another way to find the second word: `pizzaJoint.components(separatedBy: “ “)[1]`

components(separatedBy:) returns an `Array<String>` (might be empty, though, so careful!)

String is also a Collection (in the same sense that an Array is a Collection) of Characters 

All the indexing stuff (index(of:), etc.) is part of Collection.

A Collection is also a Sequence, so you can do things like ...
``` swift
for c in s { } // iterate through all Characters in s 
let characterArray = Array(s) // Array<Character>
```
(Array has an init that takes any Sequence as an argument.)

**A String is a value type (it’s a struct)**

We usually work with immutable Strings (i.e. `let s = ...`).

But there are mutating methods on String as well, for example ...
``` swift
var s = pizzaJoint // makes a mutable copy of pizzaJoint (because it’s a value type!) 
s.insert(contentsOf: “ foo”, at: s.index(of: “ “)!) // café foo pesto
```
The type of contentsOf: argument is any Collection of Character (which String is).

**Other String Methods**
``` swift
func hasPrefix(String) -> Bool
func hasSuffix(String) -> Bool
var localizedCapitalized/Lowercase/Uppercase: String
func replaceSubrange(Range<String.Index>, with: Collection of Character) 
```
e.g., `s.replaceSubrange(..<s.endIndex, with: “new contents”)`

Note the `..<` Range appears to have no start! It defaults to the start of the String.

And much, much more. Check out the documentation.


**Demo: Change our `emojiChoices` to be a String**

It really doesn’t matter either way

But it’s a good opportunity to compare String and Array (which are surprisingly similar)

We’ll also get a little bit of insight into the protocol-based design of the Foundation framework

#### NSAttributedString

**A String with attributes attached to each character**

Conceptually, an object that pairs a String and a Dictionary of attributes for each Character. 

The Dictionary’s keys are things like “the font” or “the color”, etc.

The Dictionary’s values depend on what the key is (UIFont or UIColor or whatever).

Many times (almost always), large ranges of Characters have the same Dictionary.

Often (like in your homework), the entire NSAttributedString uses the same Dictionary. 

You can put NSAttributedStrings on UILabels, UIButtons, etc.

Next week we’ll also learn how to draw an NSAttributedString on the screen directly.

**Creating and using an NSAttributedString**

Here’s how we’d make the flip count label have orange, outlined text ...

``` swift
let attributes: [NSAttributedStringKey : Any] = [ // note: type cannot be inferred here
	.strokeColor : UIColor.orange,
	.strokeWidth : 5.0 // negative number here would mean fill (positive means outline)
]
let attribtext = NSAttributedString(string: “Flips: 0”, attributes: attributes) 
flipCountLabel.attributedText = attribtext // UIButton has attributedTitle
```

**Peculiarities of NSAttributedString**

NSAttributedString is a completely different data structure than String.

The “NS” is a clue that it is an “old style” Objective-C class.

Thus it is not really like String (for example, it’s a class, not a struct).

Since it’s not a value type, you can’t create a mutable NSAttributedString by just using var. 

To get mutability, you have to use a subclass of it called `NSMutableAttributedString`. 

NSAttributedString was constructed with `NSString` in mind, not Swift’s String.

NSString and String use slightly different encodings.

There is some automatic bridging between old Objective-C stuff and Swift types.

But it can be tricky with NSString to String bridging because of varying-length Unicodes. 

This all doesn’t matter if the entire string has the same attributes (like in your homework). 

Or if the NSAttributedString doesn’t contain “wacky” Unicode characters.

Otherwise, be careful indexing into the NSAttributedString.

**Demo: Make flip count outlined text**

Let’s apply the code from the previous slide to Concentration

::: tip
`= 0` did not call `didSet`, but we can fix it by using `didSet` in outlet.
:::

#### Closures (and functions as types in general)

**Function types**

Functions are people[^people] too!
[^people]: er, types

You can declare a variable (or parameter to a method or whatever) to be of type “function” 

You’ll declare it with the types of the functions arguments (and return type) included

You can do this anywhere any other type is allowed

Example ...
``` swift
var operation: (Double) -> Double
// This is a var called operation
// It is of type “function that takes a Double and returns a Double”
// You can assign it like any other variable ...
operation = sqrt // sqrt is just a function that takes a Double and returns a Double
// You can “call” this function using syntax very similar to any function call ...
let result = operation(4.0) // result will be 2.0
```

**Closures**

Often you want to create the function “on the fly” (rather than already-existing like sqrt). 

You can do this “in line” using a closure.

Imagine we had a function that changed the sign of its argument ...
``` swift
func changeSign(operand: Double) -> Double { return -operand }
```
We could use it instead of sqrt ...
``` swift
var operation: (Double) -> Double
operation = changeSign
let result = operation(4.0) // result will be -4.0
```
We can “in line” changeSign simply by moving the function (without its name) below ...
``` swift
...
operation = (operand: Double) -> Double { return -operand }
...
// A minor syntactic change: Move the first `{` to the start and replace with `in` ...
operation = { (operand: Double) -> Double in return -operand }
// Swift can infer that operation returns a Double
operation = { (operand: Double) in return -operand }
// Swift can infer that operation returns a Double and that operand is a Double
operation = { (operand) in return -operand }
// It also knows that operation returns a value, so the return keyword is unnecessary
operation = { (operand) in return -operand }
// It also knows that operation returns a value, so the return keyword is unnecessary
operation = { (operand) in -operand }
// And finally, it’ll let you replace the parameter names with $0, $1, $2, etc., and skip in ...
operation = { -$0 }
```

**Where do we use closures?**

Often as arguments to methods.

Many times a method wants to know “what to do” and providing a function tells it what to do. 

For example, what to do when there’s an error or when something asynchronous finishes.

Or maybe you want to ask some method to repeatedly perform a function ...

Array has a method called `map` which takes a function as an argument.

It applies that function to each element of the Array to create and return a new Array.
``` swift
let primes = [2.0, 3.0, 5.0, 7.0, 11.0]
let negativePrimes = primes.map({ -$0 }) // [-2.0, -3.0, -5.0, -7.0, -11.0]
let invertedPrimes = primes.map() { 1.0/$0 } // [0.5, 0.333, 0.2, etc.]
let primeStrings = primes.map { String($0) } // [“2.0”,”3.0”,”5.0”,”7.0”,”11.0”]
```
`trailing closure` syntax

Note that if the last (or only) argument to a method is a closure, you can put it outside the method’s parentheses that contain its arguments and if the closure was the only argument, you can skip the () completely if you want.

**Closures with property initialization**

You can also execute a closure to do initialization of a property if you want ...
``` swift
var someProperty: Type = {
	// construct the value of someProperty here 
	return <the constructed value>
}()
```
This is especially useful with `lazy` property initialization.

**Capturing**

Closures are regular types, so they can be put in Arrays, Dictionarys, etc. 

When this happens, they are stored in the heap (i.e. they are reference types).

What is more, they “capture” variables they use from the surrounding code into the heap too. 

Those captured variables need to stay in the heap as long as the closure stays in the heap.
``` swift
var ltuae = 42
operation = { ltuae * $0 } // “captures” the ltuae var because it’s needed for this closure 
arrayOfOperations.append(operation)
// if we later change ltuae, then the next time we evaluate operation it will reflect that
// even if we leave the scope (function or whatever) that this code is in!
```
This can create a memory cycle though.

We’ll see this later in the quarter and how to avoid that.

**Demo: Improve indexOfOneAndOnlyFaceUpCard implementation**

We probably used more lines of code to make indexOfOneAndOnlyFaceUpCard computed However, a better implementation using a method that takes a closure would fix that

### ✅ Complete Programming Project 2.

[Programming Project 2: Set](https://github.com/chuxubank/Learning-iOS/blob/master/Developing-iOS-11-Apps-with-Swift/L3-Swift-Overview/Programming-Project-2-Set.pdf)