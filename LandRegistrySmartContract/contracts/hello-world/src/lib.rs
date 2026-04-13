#![no_std]
use soroban_sdk::{contract, contracttype, contractimpl, Env, String, Symbol, symbol_short, Address};

const COUNT_PROP: Symbol = symbol_short!("COUNT_PR");

#[contracttype]
pub enum RegisterBook {   
    Property(u64)
}

#[contracttype]
#[derive(Clone, Debug)]
pub struct Property {
    pub prop_id: u64,
    pub owner: Address,
    pub location: String,
    pub area: u64,
}

#[contract]
pub struct LandRegistry;

#[contractimpl]
impl LandRegistry {
    pub fn register_property(env: Env, owner: Address, location: String, area: u64) -> u64 {
        owner.require_auth();

        let mut prop_count: u64 = env.storage().instance().get(&COUNT_PROP).unwrap_or(0);
        prop_count += 1;

        let prop_details = Property {
            prop_id: prop_count,
            owner: owner,
            location: location,
            area: area,
        };

        env.storage().instance().set(&RegisterBook::Property(prop_count), &prop_details);
        env.storage().instance().set(&COUNT_PROP, &prop_count);
        env.storage().instance().extend_ttl(5000, 5000);

        prop_count
    }

    pub fn fetch_property(env: Env, prop_id: u64) -> Property {
        let key = RegisterBook::Property(prop_id);
        // Will panic if prop_id is not found; sufficient for basic example.
        env.storage().instance().get(&key).unwrap()
    }
}