// GraphJSON Library
class GraphJSON {
    constructor(options = {}) {
        this.constructorRegistry = new Map();
        this.resetSerializationState();
        this.allowDynamicLookup = options.allowDynamicLookup ?? true;
        this.dynamicConstructors = new Map();
        // Get the correct global object for the current environment
        this.globalObject = this.getGlobalObject();
    }

    /**
     * Gets the correct global object for the current environment
     */
    getGlobalObject() {
        if (typeof globalThis !== 'undefined') return globalThis;
        if (typeof window !== 'undefined') return window;
        if (typeof global !== 'undefined') return global;
        if (typeof self !== 'undefined') return self;
        return Function('return this')();
    }

    resetSerializationState() {
        this.nextId = 1;
        this.objectToRef = new WeakMap();
        this.refToObject = new Map();
        this.processingRefs = new Set();
    }

    registerConstructor(constructor) {
        if (typeof constructor !== 'function') {
            throw new Error('Constructor must be a function');
        }
        console.log(`Registering constructor: ${constructor.name}`);
        this.constructorRegistry.set(constructor.name, constructor);
        return this;
    }

    findConstructor(typeName) {
        // First check registry
        let constructor = this.constructorRegistry.get(typeName);
        if (constructor) {
            return constructor;
        }

        // Then check cached dynamic lookups
        constructor = this.dynamicConstructors.get(typeName);
        if (constructor) {
            return constructor;
        }

        // If dynamic lookup is allowed, try to find the constructor
        if (this.allowDynamicLookup) {
            try {
                constructor = this.globalObject[typeName];

                if (typeof constructor === 'function') {
                    console.log(`Dynamically found constructor for ${typeName}`);
                    // Cache the found constructor
                    this.dynamicConstructors.set(typeName, constructor);
                    return constructor;
                }
            } catch (e) {
                console.warn(`Error during dynamic constructor lookup for ${typeName}:`, e);
            }
        }

        return null;
    }

    stringify(rootObject) {
        this.resetSerializationState();

        const doc = {
            "@root": this.serializeValue(rootObject),
            "@version": "1.0"
        };

        for (const [ref, obj] of this.refToObject.entries()) {
            doc[ref] = this.serializeObject(obj);
        }

        return JSON.stringify(doc);
    }

    parse(jsonString) {
        this.resetSerializationState();

        const doc = JSON.parse(jsonString);
        if (!doc["@root"]) {
            throw new Error("Invalid Graph JSON: missing @root");
        }

        // First pass: create objects
        for (const [key, value] of Object.entries(doc)) {
            if (key.startsWith("@obj")) {
                const obj = this.createObject(value);
                this.refToObject.set(key, obj);
            }
        }

        // Second pass: populate properties
        for (const [key, value] of Object.entries(doc)) {
            if (key.startsWith("@obj")) {
                this.populateObject(this.refToObject.get(key), value);
            }
        }

        return this.resolveReference(doc["@root"]);
    }

    serializeValue(value) {
        if (!value || typeof value !== 'object') {
            return value;
        }

        const ref = this.getReference(value);
        return { "@ref": ref };
    }

    getReference(obj) {
        if (!obj || typeof obj !== 'object') {
            return null;
        }

        let ref = this.objectToRef.get(obj);
        if (!ref) {
            ref = `@obj${this.nextId++}`;
            this.objectToRef.set(obj, ref);
            this.refToObject.set(ref, obj);
        }
        return ref;
    }

    serializeObject(obj) {
        const ref = this.getReference(obj);

        if (this.processingRefs.has(ref)) {
            throw new Error("Circular reference detected");
        }

        this.processingRefs.add(ref);

        try {
            const result = {
                "@type": obj.constructor.name
            };

            if (Array.isArray(obj)) {
                result["@array"] = obj.map(item => this.serializeValue(item));
                return result;
            }

            for (const [key, value] of Object.entries(obj)) {
                if (!Object.prototype.propertyIsEnumerable.call(obj, key)) continue;
                result[key] = this.serializeValue(value);
            }

            return result;
        } finally {
            this.processingRefs.delete(ref);
        }
    }

    createObject(def) {
        if (!def["@type"]) {
            return {};
        }

        const typeName = def["@type"];
        console.log(`Creating object of type: ${typeName}`);

        if (typeName === "Array" || def["@array"]) {
            return [];
        }

        const constructor = this.findConstructor(typeName);

        if (constructor) {
            console.log(`Using constructor for ${typeName}`);
            try {
                const instance = new constructor();
                console.log(`Successfully created instance of ${typeName}`);
                return instance;
            } catch (e) {
                console.warn(`Constructor failed for ${typeName}, using Object.create`, e);
                return Object.create(constructor.prototype);
            }
        }

        console.warn(`No constructor found for type ${typeName}, using plain object`);
        return {};
    }

    populateObject(obj, def) {
        if (Array.isArray(obj)) {
            const elements = def["@array"] || [];
            elements.forEach((element, index) => {
                obj[index] = this.resolveReference(element);
            });
            return;
        }

        for (const [key, value] of Object.entries(def)) {
            if (key.startsWith("@")) continue;
            obj[key] = this.resolveReference(value);
        }
    }

    resolveReference(value) {
        if (!value || typeof value !== 'object') {
            return value;
        }

        if (value["@ref"]) {
            const ref = value["@ref"];
            const obj = this.refToObject.get(ref);
            if (!obj) {
                throw new Error(`Unresolved reference: ${ref}`);
            }
            return obj;
        }

        return value;
    }
}

// Test Classes (for demonstration)
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.friends = [];
    }
}

class Company {
    constructor(name) {
        this.name = name;
        this.employees = [];
        this.ceo = null;
    }
}

// Test Function
function runTest() {
    console.log("Starting test...");

    const graphJSON = new GraphJSON({ allowDynamicLookup: true });
    console.log("Global object identified as:", graphJSON.globalObject.constructor.name);

    // Make test classes globally available
    graphJSON.globalObject.Person = Person;
    graphJSON.globalObject.Company = Company;

    // Create test objects
    const company = new Company("TechCorp");
    const person = new Person("John", 30);
    company.ceo = person;
    company.employees = [person];

    // Test serialization and deserialization
    const json = graphJSON.stringify(company);
    console.log("\nSerialized JSON:", json);

    const deserialized = graphJSON.parse(json);

    // Type checks
    console.log("\nType checks:");
    console.log("Company type:", deserialized.constructor.name);
    console.log("Person type:", deserialized.ceo.constructor.name);

    // Assertions
    console.assert(deserialized instanceof Company, "Company instance check");
    console.assert(deserialized.ceo instanceof Person, "Person instance check");
    console.assert(deserialized.employees[0] === deserialized.ceo, "Reference preserved");

    console.log("\nAll assertions completed!");
}

// Run the test
runTest();