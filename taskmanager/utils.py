def is_subset_dict(a: dict, b: dict):
    # check if 'a' contains the 'b'
    return all(a[k] == v for k, v in b.items())
