# hello.py
import sys
import json

try:
    state = sys.argv[1]
    date = sys.argv[2]
    tmin = sys.argv[3]
    tmax = sys.argv[4]
    
    result = [{      
      "risk_score": 0.53,
      "alias": "Moderate",
      "visualization": {
          "chart": {},
          "graph": {}
      },
      "input_params": {
          "state": state,
          "date": date,
          "tmin": tmin,
          "tmax": tmax
      }
    }]
    
    print(json.dumps(result))

except Exception as e:
    error_result = {
        "success": False,
        "error": str(e)
    }
    print(json.dumps(error_result))