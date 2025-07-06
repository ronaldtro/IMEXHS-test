def flatten_and_parse(data_lines: list[str]) -> list[int]:
    try:
        numbers = [int(n) for line in data_lines for n in line.split()]
        return numbers
    except ValueError:
        raise ValueError("All elements in 'data' must be numbers")


def normalize_data(data: list[int]) -> list[float]:
    max_val = max(data)
    return [round(d / max_val, 6) for d in data] if max_val else data


def average(data: list[float | int]) -> float:
    return round(sum(data) / len(data), 4) if data else 0
