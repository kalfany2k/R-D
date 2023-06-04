import random

event_ids = list(range(1, 501))
category_ids = list(range(1, 10))

sql_script = "INSERT INTO product_event_category (event_id, category_id)\nVALUES\n"

for _ in range(1000):
    event_id = random.choice(event_ids)
    category_id = random.choice(category_ids)
    sql_script += f"({event_id}, {category_id}),\n"

# Remove the trailing comma and newline character
sql_script = sql_script[:-2] + ";"

print(sql_script)
