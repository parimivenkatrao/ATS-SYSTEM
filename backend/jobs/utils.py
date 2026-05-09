def calculate_score(js,cs):
 js=set(js.lower().split(',')); cs=set(cs.lower().split(','))
 return (len(js&cs)/len(js))*100 if js else 0
